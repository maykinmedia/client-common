import { notImplemented } from "../assert";

/**
 * Type for serialisation options.
 */
export type SerializeOptions<TypedFallback = null> = {
  /**
   * Whether to shorten checkbox arrays when serializing.
   *
   * - Default: `true`.
   * - If `true` (default), only the selected values are included in the array,
   *   producing a compact array like `["foo", "bar"]`. This is preferred for form serialization.
   * - If `false`, the array preserves the original checkbox states,
   *   including `true` for selected and `false` for unselected values, e.g., `[true, false, true]`.
   *   This is useful if index-based access is required, for example in validation lookups.
   */
  trimCheckboxArray: boolean;

  /** Whether to return typed values  according the input types. */
  typed: boolean;

  /** Fallback when serializing an empty typed input. */
  typedFallback: TypedFallback;
};

/**
 * Type for a single input value based on `typed` and `typedFallback` members of
 * `SO` (SerializeOptions).
 */
type SerializedValue<SO> = SO extends {
  typed: infer Typed; // Check whether `typed` is set.
}
  ? Typed extends true // Check whether `typed` is true.
    ? SO extends { typedFallback: infer TypedFallback } // Check whether `typedFallback` is set.
      ? boolean | string | number | Date | TypedFallback // Use `typedFallback` in union.
      : boolean | string | number | Date | null // Use `null` (default) in union.
    : string // `typed` is falsy, use `string` as type.
  : string; // `typed` is not set, use `string` as type.

/**
 * Returns the final options including defaults.
 * @typeParam TypedFallback - Fallback when serializing an empty typed input.
 * @param options - The user options.
 */
export const parseOptions = <
  TypedFallback,
  SO extends Partial<SerializeOptions<TypedFallback>>,
>(
  options?: SO,
): SerializeOptions<TypedFallback> => {
  const baseOptions: SerializeOptions<TypedFallback> = {
    trimCheckboxArray: true,
    typed: false,
    typedFallback: null as TypedFallback,
  };
  return Object.assign(baseOptions, options || {});
};

/**
 * Serializes an HTML form into a typed object by collecting values from all named form controls.
 *
 * Iterates over all named elements in the form and maps each serialized value to its
 * corresponding key in the returned object.
 *
 * @typeParam TypedFallback - Type of value to for empty inputs when typed.
 * @typeParam SO - Serialization options.
 * @typeParam T - The expected structure of the output object.
 * @param form - The HTMLFormElement instance to serialize.
 * @param options - Options for serialization.
 * @returns An object of type T containing serialized form data keyed by element names.
 */
export function serializeFormElement<
  TypedFallback,
  SO extends Partial<SerializeOptions<TypedFallback>> & {
    typed: true;
  },
  T = Record<string, SerializedValue<SO>>,
>(form: HTMLFormElement, options: SO): T;

export function serializeFormElement<
  TypedFallback,
  SO extends Partial<SerializeOptions<TypedFallback>> & {
    typed?: boolean;
  } = Partial<SerializeOptions<TypedFallback>> & { typed?: false },
  T = Record<string, SerializedValue<SO>>,
>(form: HTMLFormElement, options?: SO): T;

export function serializeFormElement<
  TypedFallback,
  SO extends Partial<SerializeOptions<TypedFallback>>,
  T = Record<string, SerializedValue<SO>>,
>(form: HTMLFormElement, options?: SO): T {
  const elements = form.elements;
  const data: T = {} as T;
  const parsedOptions = parseOptions(options);

  for (const element of elements) {
    const name = element.getAttribute("name");
    if (!name) continue;

    const formControl = elements.namedItem(name) as Element | RadioNodeList;
    const key = name as keyof T;
    const value = serializeElement(formControl, parsedOptions);

    data[key] = value as T[keyof T];
  }
  return data;
}

/**
 * Serializes a single form control element or group of controls.
 *
 * Determines the element type and delegates to the appropriate serialization function.
 * Currently, supports input, select, textarea, and RadioNodeList elements.
 *
 * @typeParam TypedFallback - Type of value to for empty inputs when typed.
 * @typeParam SO - Serialization options.
 * @param element - The form control or RadioNodeList to serialize.
 * @param options - Options for serialization.
 * @returns The serialized value of the element, or undefined if unsupported.
 */
export function serializeElement<
  TypedFallback,
  SO extends Partial<SerializeOptions<TypedFallback>> & {
    typed: true;
  },
>(element: Element | RadioNodeList, options: SO): SerializedValue<SO>;

export function serializeElement<
  TypedFallback,
  SO extends Partial<SerializeOptions<TypedFallback>> & {
    typed?: boolean;
  },
>(element: Element | RadioNodeList, options?: SO): SerializedValue<SO>;

export function serializeElement<
  TypedFallback,
  SO extends Partial<SerializeOptions<TypedFallback>>,
>(element: Element | RadioNodeList, options?: SO) {
  const parsedOptions = parseOptions<TypedFallback, SO>(options);

  if (element instanceof HTMLInputElement) {
    return serializeInputElement(element, parsedOptions);
  } else if (element instanceof HTMLSelectElement) {
    return serializeSelectElement(element);
  } else if (element instanceof HTMLTextAreaElement) {
    return serializeTextAreaElement(element);
  } else if (element instanceof RadioNodeList) {
    return serializeRadioNodeList(element, parsedOptions);
  }

  // Explicitly not returning a value.
  return undefined;
}

/**
 * Serializes an individual HTMLInputElement.
 *
 * For checkboxes and radios, only returns a value if checked.
 * Otherwise, returns the input's value.
 *
 * @typeParam TypedFallback - Type of value to for empty inputs when typed.
 * @typeParam SO - Serialization options.
 * @param input - The input element to serialize.
 * @param options - Options for serialization.
 * @returns The input's value or undefined if unchecked checkbox/radio.
 */
export function serializeInputElement<
  TypedFallback,
  SO extends Partial<SerializeOptions<TypedFallback>> & {
    typed: true;
  },
>(input: HTMLInputElement, options: SO): SerializedValue<SO>;

export function serializeInputElement<
  TypedFallback,
  SO extends Partial<SerializeOptions<TypedFallback>> & {
    typed?: boolean;
  },
>(input: HTMLInputElement, options?: SO): SerializedValue<SO>;

export function serializeInputElement<
  TypedFallback,
  SO extends Partial<SerializeOptions<TypedFallback>>,
>(input: HTMLInputElement, options?: SO) {
  const parsedOptions = parseOptions(options);
  if (parsedOptions?.typed) {
    switch (input.type) {
      case "checkbox":
        return input.checked;

      case "radio":
        return input.checked ? input.value : parsedOptions.typedFallback;

      case "date":
      case "datetime-local":
        return input.value === ""
          ? parsedOptions.typedFallback
          : new Date(input.value);

      case "number":
        return input.value === ""
          ? parsedOptions.typedFallback
          : parseInt(input.value);

      case "range":
        return parseInt(input.value);

      // TODO: TBD
      case "file":
      case "image":
      case "month":
        return notImplemented(`Serializing input[type=${input.type}]`);

      default:
        return input.value;
    }
  }

  if ((input.type === "checkbox" || input.type === "radio") && !input.checked) {
    // Explicitly not returning a value.
    return undefined;
  }

  return input.value;
}

/**
 * Serializes an HTMLSelectElement.
 *
 * If the select allows multiple selections, returns an array of selected values.
 * Otherwise, returns the single selected value.
 *
 * @param select - The select element to serialize.
 * @returns A string or array of strings representing the selected option(s).
 */
export const serializeSelectElement = (select: HTMLSelectElement) => {
  return select.multiple
    ? [...select.options].filter((o) => o.selected).map((o) => o.value)
    : select.value;
};

/**
 * Serializes an HTMLTextAreaElement.
 *
 * Returns the textarea’s current value.
 *
 * @param textArea - The textarea element to serialize.
 * @returns The value of the textarea.
 */
export const serializeTextAreaElement = (textArea: HTMLTextAreaElement) => {
  return textArea.value;
};

/**
 * Serializes a RadioNodeList, which can represent radios, checkboxes, or other grouped inputs.
 *
 * Behavior:
 * - For radios: returns the selected value, or undefined if none selected.
 * - For checkboxes: returns an array of checked values.
 * - For other grouped inputs: returns an array of serialized values.
 *
 * Note: RadioNodeList includes all elements sharing the same `name` attribute,
 * not only radio buttons.
 *
 * @typeParam TypedFallback - Type of value to for empty inputs when typed.
 * @typeParam SO - Serialization options.
 * @param radioNodeList - The RadioNodeList to serialize.
 * @param options - Options for serialization.
 * @returns A string, an array of strings, or undefined depending on input type and selection.
 */
export const serializeRadioNodeList = <
  TypedFallback,
  SO extends Partial<SerializeOptions<TypedFallback>>,
>(
  radioNodeList: RadioNodeList,
  options?: SO,
):
  | string
  | string[]
  | undefined
  | (string | number | boolean | TypedFallback | Date)[] => {
  const parsedOptions = parseOptions<TypedFallback, SO>(options);
  const value = radioNodeList.value;

  if (value) return value; // One selected value found.

  // Convert NodeList to array
  const array = [...radioNodeList];
  const inputs = array.filter((n) => n instanceof HTMLInputElement);
  const radios = inputs.filter((n) => n.type === "radio");

  // Case: radio buttons with no selected value (may have empty string value)
  if (radios.length) {
    return undefined;
  }

  // Case: checkboxes
  const checkboxes = inputs.filter((n) => n.type === "checkbox");
  if (checkboxes.length) {
    return checkboxes
      .filter((n) => !parsedOptions?.trimCheckboxArray || n.checked)
      .map((i) =>
        serializeInputElement(
          i,
          parsedOptions.trimCheckboxArray
            ? { ...parsedOptions, typed: false }
            : parsedOptions,
        ),
      ) as string[];
  }

  // Case: fallback for other elements
  const elements = array.filter(
    (n) =>
      n instanceof HTMLInputElement ||
      n instanceof HTMLSelectElement ||
      n instanceof HTMLTextAreaElement,
  );

  return elements.map((e) => serializeElement(e, parsedOptions));
};
