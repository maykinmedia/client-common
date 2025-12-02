import { describe, expect } from "vitest";

import { serializeFormElement, serializeInputElement } from "./serialize.ts";

/**
 * Creates a new `tagName` with `attrs`, optionally as child of `parent`.
 * @param tagName - The HTML tag name.
 * @param attrs - The attributes to set.
 * @param parent - The parent element.
 */
const elementFactory = <T extends HTMLElement>(
  tagName: string,
  attrs?: Record<string, string>,
  parent?: HTMLElement,
) => {
  const element = document.createElement(tagName);

  // Set attributes.
  for (const attr in attrs) {
    element.setAttribute(attr, attrs[attr]);
  }

  // Add to parent.
  if (parent) {
    parent.appendChild(element);
  }

  return element as T;
};

describe("serializeFormElement", () => {
  describe("input", () => {
    test.each`
      attrs                                           | expected
      ${{ name: "text", type: "text", value: "foo" }} | ${"foo"}
      ${{ name: "text", type: "text", value: "" }}    | ${""}
      ${{ name: "text", type: "text" }}               | ${""}
    `(
      "should serialize an input with value $attrs.value to $expected",
      ({ attrs, expected }) => {
        const form = elementFactory<HTMLFormElement>("form");
        elementFactory<HTMLInputElement>("input", attrs, form);

        const data = serializeFormElement(form);
        expect(data).toEqual({ [attrs.name]: expected });
      },
    );

    const date = new Date("2023-09-15");
    const dateTime = new Date("2023-09-15T21:36");

    test.each`
      attrs                                                                      | type           | value
      ${{ name: "checkbox", type: "checkbox", checked: true }}                   | ${"boolean"}   | ${true}
      ${{ name: "checkbox", type: "checkbox" }}                                  | ${"boolean"}   | ${false}
      ${{ name: "radio", type: "radio", value: "538", checked: true }}           | ${"string"}    | ${"538"}
      ${{ name: "radio", type: "radio", value: "538" }}                          | ${"object"}    | ${null}
      ${{ name: "data", type: "date", value: "2023-09-15" }}                     | ${"object"}    | ${date}
      ${{ name: "datetime", type: "datetime-local", value: "2023-09-15T21:36" }} | ${"object"}    | ${dateTime}
      ${{ name: "number", type: "number", value: "15" }}                         | ${"number"}    | ${15}
      ${{ name: "range", type: "range", value: "15" }}                           | ${"number"}    | ${15}
      ${{ name: "button", type: "button", value: "jim" }}                        | ${"string"}    | ${"jim"}
      ${{ name: "color", type: "color", value: "#FFFFFF" }}                      | ${"string"}    | ${"#ffffff"}
      ${{ name: "email", type: "email", value: "jd@example.com" }}               | ${"string"}    | ${"jd@example.com"}
      ${{ name: "hidden", type: "hidden", value: "🙈" }}                         | ${"string"}    | ${"🙈"}
      ${{ name: "password", type: "password", value: "swordfish" }}              | ${"string"}    | ${"swordfish"}
      ${{ name: "search", type: "search", value: "sunrise" }}                    | ${"string"}    | ${"sunrise"}
      ${{ name: "tel", type: "tel", value: "+31207530523" }}                     | ${"string"}    | ${"+31207530523"}
      ${{ name: "file", type: "file" }}                                          | ${"string"}    | ${Error}
      ${{
  name: "text",
  type: "url",
  value: "https://example.com",
}} | ${"string"} | ${"https://example.com"}
      ${{ name: "text", type: "file" }}                                          | ${"undefined"} | ${Error}
    `("should type $attrs.type to $type", async ({ attrs, type, value }) => {
      const form = elementFactory<HTMLFormElement>("form");
      elementFactory<HTMLInputElement>("input", attrs, form);

      if (value === Error) {
        expect(() => serializeFormElement(form, { typed: true })).toThrow(
          `NOT_IMPLEMENTED: Serializing input[type=${attrs.type}] is not implemented`,
        );
        return;
      }
      const data = serializeFormElement(form, { typed: true });
      expect(typeof data[attrs.name]).toBe(type);
      expect(data[attrs.name]).toEqual(value);
    });
  });

  describe("checkbox", () => {
    test.each`
      attrs                                     | options                   | value             | expected
      ${{ name: "checkbox", type: "checkbox" }} | ${["foo", "bar"]}         | ${["bar"]}        | ${["bar"]}
      ${{ name: "checkbox", type: "checkbox" }} | ${["foo", "bar"]}         | ${["foo", "bar"]} | ${["foo", "bar"]}
      ${{ name: "checkbox", type: "checkbox" }} | ${["foo", "bar"]}         | ${[""]}           | ${[]}
      ${{ name: "checkbox", type: "checkbox" }} | ${["foo", "bar"]}         | ${["baz"]}        | ${[]}
      ${{ name: "checkbox", type: "checkbox" }} | ${[""]}                   | ${[""]}           | ${""}
      ${{ name: "checkbox", type: "checkbox" }} | ${[undefined, undefined]} | ${[undefined]}    | ${["on", "on"]}
      ${{ name: "checkbox", type: "checkbox" }} | ${[undefined]}            | ${[undefined]}    | ${"on"}
      ${{ name: "checkbox", type: "checkbox" }} | ${["foo"]}                | ${[undefined]}    | ${undefined}
    `(
      "should serialize a checkbox with options $options and value $value to $expected",
      ({ attrs, options, value, expected }) => {
        const form = elementFactory<HTMLFormElement>("form");

        for (const option of options) {
          const checkbox = elementFactory<HTMLInputElement>(
            "input",
            attrs,
            form,
          );

          if (typeof option !== "undefined") {
            checkbox.setAttribute("value", option);
          }

          if (value.includes(option)) {
            checkbox.setAttribute("checked", "true");
          }
        }

        expect(serializeFormElement(form)).toEqual({ [attrs.name]: expected });
      },
    );

    test("should serialize a single checkbox to boolean when using typed serialization", () => {
      const form = elementFactory<HTMLFormElement>("form");
      elementFactory<HTMLInputElement>(
        "input",
        { name: "checkbox", type: "checkbox", checked: "true" },
        form,
      );

      expect(serializeFormElement(form, { typed: true })).toEqual({
        checkbox: true,
      });
    });

    test("should serialize multiple checkboxes to Array when using typed serialization", () => {
      const form = elementFactory<HTMLFormElement>("form");
      elementFactory<HTMLInputElement>(
        "input",
        { name: "checkbox", type: "checkbox", value: "1" },
        form,
      );

      elementFactory<HTMLInputElement>(
        "input",
        { name: "checkbox", type: "checkbox", value: "2", checked: "true" },
        form,
      );

      elementFactory<HTMLInputElement>(
        "input",
        { name: "checkbox", type: "checkbox", value: "3", checked: "true" },
        form,
      );

      expect(serializeFormElement(form, { typed: true })).toEqual({
        checkbox: ["2", "3"],
      });
    });

    test("should serialize a single checkbox to string when not using typed serialization", () => {
      const form = elementFactory<HTMLFormElement>("form");
      elementFactory<HTMLInputElement>(
        "input",
        { name: "checkbox", type: "checkbox", checked: "true" },
        form,
      );

      expect(serializeFormElement(form, { typed: false })).toEqual({
        checkbox: "on",
      });
    });

    test("should serialize multiple checkboxes to Array when not using typed serialization", () => {
      const form = elementFactory<HTMLFormElement>("form");
      elementFactory<HTMLInputElement>(
        "input",
        { name: "checkbox", type: "checkbox", value: "1" },
        form,
      );

      elementFactory<HTMLInputElement>(
        "input",
        { name: "checkbox", type: "checkbox", value: "2", checked: "true" },
        form,
      );

      elementFactory<HTMLInputElement>(
        "input",
        { name: "checkbox", type: "checkbox", value: "3", checked: "true" },
        form,
      );

      expect(serializeFormElement(form, { typed: false })).toEqual({
        checkbox: ["2", "3"],
      });
    });

    test("should preserve original checkbox order when not using trimCheckboxArray", () => {
      const form = elementFactory<HTMLFormElement>("form");
      elementFactory<HTMLInputElement>(
        "input",
        { name: "checkbox", type: "checkbox", value: "1" },
        form,
      );

      elementFactory<HTMLInputElement>(
        "input",
        { name: "checkbox", type: "checkbox", value: "2", checked: "true" },
        form,
      );

      elementFactory<HTMLInputElement>(
        "input",
        { name: "checkbox", type: "checkbox", value: "3", checked: "true" },
        form,
      );

      expect(serializeFormElement(form, { trimCheckboxArray: false })).toEqual({
        checkbox: [undefined, "2", "3"],
      });
      expect(
        serializeFormElement(form, { trimCheckboxArray: false, typed: true }),
      ).toEqual({
        checkbox: [false, true, true],
      });
    });
  });

  describe("radio", () => {
    test.each`
      attrs                               | options                   | value          | expected
      ${{ name: "radio", type: "radio" }} | ${["foo", "bar"]}         | ${"bar"}       | ${"bar"}
      ${{ name: "radio", type: "radio" }} | ${["foo", "bar"]}         | ${""}          | ${undefined}
      ${{ name: "radio", type: "radio" }} | ${["foo", "bar"]}         | ${"baz"}       | ${undefined}
      ${{ name: "radio", type: "radio" }} | ${[""]}                   | ${""}          | ${""}
      ${{ name: "radio", type: "radio" }} | ${[undefined, undefined]} | ${undefined}   | ${"on"}
      ${{ name: "radio", type: "radio" }} | ${["foo"]}                | ${[undefined]} | ${undefined}
    `(
      "should serialize a radio with options $options and value $value to $expected",
      ({ attrs, options, value, expected }) => {
        const form = elementFactory<HTMLFormElement>("form");

        for (const option of options) {
          const radio = elementFactory<HTMLInputElement>("input", attrs, form);

          if (typeof option !== "undefined") {
            radio.setAttribute("value", option);
          }

          if (option === value) {
            radio.setAttribute("checked", "true");
          }
        }

        expect(serializeFormElement(form)).toEqual({ [attrs.name]: expected });
      },
    );
  });

  describe("select", () => {
    test.each`
      attrs                                                 | options                   | value         | expected
      ${{ name: "select", type: "select" }}                 | ${["foo", "bar"]}         | ${"bar"}      | ${"bar"}
      ${{ name: "select", type: "select" }}                 | ${["foo", "bar"]}         | ${""}         | ${"foo"}
      ${{ name: "select", type: "select" }}                 | ${["foo", "bar"]}         | ${"baz"}      | ${"foo"}
      ${{ name: "select", type: "select" }}                 | ${[""]}                   | ${""}         | ${""}
      ${{ name: "select", type: "select" }}                 | ${[undefined, undefined]} | ${undefined}  | ${""}
      ${{ name: "select", type: "select", multiple: true }} | ${["1", "2", "3"]}        | ${["1", "2"]} | ${["1", "2"]}
    `(
      "should serialize a select with options $options and value $value to $expected",
      ({ attrs, options, value, expected }) => {
        const form = elementFactory<HTMLFormElement>("form");
        const select = elementFactory<HTMLInputElement>("select", attrs, form);

        for (const option of options) {
          const optionElement = elementFactory("option", {}, select);
          if (typeof option !== "undefined") {
            optionElement.setAttribute("value", option);
          }

          if (
            (Array.isArray(value) && value.includes(option)) ||
            option === value
          ) {
            optionElement.setAttribute("selected", "true");
          }
        }

        expect(serializeFormElement(form)).toEqual({ [attrs.name]: expected });
      },
    );
  });

  describe("textarea", () => {
    test.each`
      attrs                   | value        | expected
      ${{ name: "textarea" }} | ${"foo"}     | ${"foo"}
      ${{ name: "textarea" }} | ${""}        | ${""}
      ${{ name: "textarea" }} | ${undefined} | ${""}
    `(
      "should serialize a textarea with value $value to $expected",
      ({ attrs, value, expected }) => {
        const form = elementFactory<HTMLFormElement>("form");
        const textarea = elementFactory<HTMLInputElement>(
          "textarea",
          attrs,
          form,
        );
        textarea.textContent = value;

        const data = serializeFormElement(form);
        expect(data).toEqual({ [attrs.name]: expected });
      },
    );
  });

  describe("arrays", () => {
    it("should serialize multiple fields with the same name into an array", () => {
      const form = elementFactory<HTMLFormElement>("form");
      //
      // Input.
      //

      elementFactory<HTMLInputElement>(
        "input",
        { name: "input", value: "foo" },
        form,
      );
      elementFactory<HTMLInputElement>(
        "input",
        { name: "input", value: "bar" },
        form,
      );

      //
      // checkbox.
      //

      elementFactory<HTMLInputElement>(
        "input",
        { checked: "true", name: "checkbox", type: "checkbox", value: "foo" },
        form,
      );
      elementFactory<HTMLInputElement>(
        "input",
        { checked: "true", name: "checkbox", type: "checkbox", value: "bar" },
        form,
      );
      elementFactory<HTMLInputElement>(
        "input",
        { name: "checkbox", type: "checkbox", value: "bar" },
        form,
      );

      //
      // radio.
      //

      elementFactory<HTMLInputElement>(
        "input",
        { name: "radio", type: "radio", value: "foo" },
        form,
      );
      elementFactory<HTMLInputElement>(
        "input",
        { checked: "true", name: "radio", type: "radio", value: "bar" },
        form,
      );
      elementFactory<HTMLInputElement>(
        "input",
        { name: "radio", type: "radio", value: "bar" },
        form,
      );

      //
      // Select.
      //

      const select1 = elementFactory<HTMLSelectElement>(
        "select",
        { name: "select" },
        form,
      );
      elementFactory<HTMLOptionElement>("option", { value: "foo" }, select1);

      const select2 = elementFactory<HTMLSelectElement>(
        "select",
        { name: "select" },
        form,
      );
      elementFactory<HTMLOptionElement>("option", { value: "bar" }, select2);

      //
      // Textarea.
      //
      const textarea1 = elementFactory<HTMLTextAreaElement>(
        "textarea",
        { name: "textarea" },
        form,
      );
      textarea1.textContent = "foo";

      const textarea2 = elementFactory<HTMLTextAreaElement>(
        "textarea",
        { name: "textarea" },
        form,
      );
      textarea2.textContent = "bar";

      //
      // Assert.
      //

      const data = serializeFormElement(form);
      expect(data).toEqual({
        input: ["foo", "bar"],
        checkbox: ["foo", "bar"],
        radio: "bar", // Radio can only have one value.
        select: ["foo", "bar"],
        textarea: ["foo", "bar"],
      });
    });
  });

  describe("non field elements", () => {
    test("should ignore non field elements", () => {
      const form = elementFactory<HTMLFormElement>("form");
      const fieldset = elementFactory<HTMLFieldSetElement>(
        "fieldset",
        {},
        form,
      );
      elementFactory<HTMLInputElement>(
        "input",
        { name: "input", value: "foo" },
        fieldset,
      );

      // TODO: Decide on whether buttons should be supported (and checked for an active state?)
      elementFactory<HTMLButtonElement>(
        "button",
        { name: "button", value: "foo" },
        fieldset,
      );

      const data = serializeFormElement(form);
      expect(data).toEqual({ input: "foo" });
    });
  });
});

describe("Issue #20 - Calling serializeInputElement returns incorrect values for empty inputs when in typed mode", () => {
  test.each`
    attrs                                                           | expected
    ${{ name: "radio", type: "radio" }}                             | ${null}
    ${{ name: "date", type: "date" }}                               | ${null}
    ${{ name: "datetime-local", type: "datetime-local" }}           | ${null}
    ${{ name: "number", type: "number" }}                           | ${null}
    ${{ name: "checkbox", type: "checkbox" }}                       | ${false}
    ${{ name: "range", type: "range", min: 0, max: 10, value: "" }} | ${5}
    ${{ name: "range", type: "text" }}                              | ${""}
  `(
    "calling serializeInputElement should return $expected for an emtpy $attrs.type input without options.typedFallback set",
    ({ attrs, expected }) => {
      const form = elementFactory<HTMLFormElement>("form");
      const input = elementFactory<HTMLInputElement>("input", attrs, form);
      expect(serializeInputElement(input, { typed: true })).toEqual(expected);
      expect(serializeFormElement(form, { typed: true })).toEqual({
        [attrs.name]: expected,
      });
    },
  );

  test.each`
    attrs                                                           | expected
    ${{ name: "radio", type: "radio" }}                             | ${undefined}
    ${{ name: "date", type: "date" }}                               | ${undefined}
    ${{ name: "datetime-local", type: "datetime-local" }}           | ${undefined}
    ${{ name: "number", type: "number" }}                           | ${undefined}
    ${{ name: "checkbox", type: "checkbox" }}                       | ${false}
    ${{ name: "range", type: "range", min: 0, max: 10, value: "" }} | ${5}
    ${{ name: "range", type: "text" }}                              | ${""}
  `(
    "calling serializeInputElement should return options.typedFallback for an emtpy $attrs.type input",
    ({ attrs, expected }) => {
      const form = elementFactory<HTMLFormElement>("form");
      const input = elementFactory<HTMLInputElement>("input", attrs, form);
      expect(
        serializeInputElement(input, { typed: true, typedFallback: undefined }),
      ).toEqual(expected);
      expect(
        serializeFormElement(form, { typed: true, typedFallback: undefined }),
      ).toEqual({
        [attrs.name]: expected,
      });
    },
  );

  test("RadioNodeList empty value", () => {
    const form = elementFactory<HTMLFormElement>("form");
    elementFactory<HTMLInputElement>(
      "input",
      { name: "radio", type: "radio" },
      form,
    );
    elementFactory<HTMLInputElement>(
      "input",
      { name: "radio", type: "radio" },
      form,
    );

    const untyped = serializeFormElement(form);
    expect(untyped).toEqual({ radio: undefined });

    const typed = serializeFormElement(form, { typed: true });
    expect(typed).toEqual({ radio: null });

    const custom = serializeFormElement(form, {
      typed: true,
      typedFallback: -1,
    });
    expect(custom).toEqual({ radio: -1 });
  });
});
