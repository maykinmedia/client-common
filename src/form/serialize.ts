import { notImplemented } from "../assert";

export type SerializeOptions = {
  /** Whether to return typed values  according the input types. */
  typed?: boolean;
};

/**
 * Serializes an HTML form into a typed object by collecting values from all named form controls.
 *
 * Iterates over all named elements in the form and maps each serialized value to its
 * corresponding key in the returned object.
 *
 * @typeParam T - The expected structure of the output object.
 * @param form - The HTMLFormElement instance to serialize.
 * @param options - Options for serialisation.
 * @returns An object of type T containing serialized form data keyed by element names.
 */
export const serializeFormElement = <T extends Record<string, unknown>>(
  form: HTMLFormElement,
  options?: SerializeOptions,
): T => {
  const elements = form.elements;
  const data: T = {} as T;

  for (const element of elements) {
    const name = element.getAttribute("name");
    if (!name) continue;

    const key = name as keyof T;
    const formControl = elements.namedItem(name) as Element | RadioNodeList;
    data[key] = serializeElement(formControl, options) as T[keyof T];
  }
  return data;
};

/**
 * Serializes a single form control element or group of controls.
 *
 * Determines the element type and delegates to the appropriate serialization function.
 * Currently, supports input, select, textarea, and RadioNodeList elements.
 *
 * @param element - The form control or RadioNodeList to serialize.
 * @param options - Options for serialization.
 * @returns The serialized value of the element, or undefined if unsupported.
 */
export const serializeElement = (
  element: Element | RadioNodeList,
  options?: SerializeOptions,
) => {
  if (element instanceof HTMLInputElement) {
    return serializeInputElement(element, options);
  } else if (element instanceof HTMLSelectElement) {
    return serializeSelectElement(element);
  } else if (element instanceof HTMLTextAreaElement) {
    return serializeTextAreaElement(element);
  } else if (element instanceof RadioNodeList) {
    return serializeRadioNodeList(element, options);
  }

  // Explicitly not returning a value.
  return undefined;
};

/**
 * Serializes an individual HTMLInputElement.
 *
 * For checkboxes and radios, only returns a value if checked.
 * Otherwise, returns the input's value.
 *
 * @param input - The input element to serialize.
 * @param options - Options for serialisation.
 * @returns The input's value or undefined if unchecked checkbox/radio.
 */
export const serializeInputElement = (
  input: HTMLInputElement,
  options?: SerializeOptions,
) => {
  if (options?.typed) {
    switch (input.type) {
      case "checkbox":
        return input.checked;

      case "radio":
        return input.checked ? input.value : undefined;

      case "date":
      case "datetime-local":
        return new Date(input.value);

      case "number":
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
};

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
 * @param radioNodeList - The RadioNodeList to serialize.
 * @param options - Options for serialisation.
 * @returns A string, an array of strings, or undefined depending on input type and selection.
 */
export const serializeRadioNodeList = (
  radioNodeList: RadioNodeList,
  options?: SerializeOptions,
): string | string[] | undefined => {
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
      .filter((n) => n.checked)
      .map((i) =>
        serializeInputElement(i, { ...options, typed: false }),
      ) as string[];
  }

  // Case: fallback for other elements
  const elements = array.filter(
    (n) =>
      n instanceof HTMLInputElement ||
      n instanceof HTMLSelectElement ||
      n instanceof HTMLTextAreaElement,
  );

  return elements.map((e) => serializeElement(e, options)) as string[];
};
