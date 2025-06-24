import { expect } from "vitest";

import {
  String2TitleOptions,
  addSpaces,
  hyphens2Whitespace,
  isLink,
  removeSpecialChars,
  slugify,
  string2Title,
  strip,
  stripEnd,
  stripStart,
  title,
  toASCII,
  ucFirst,
  whitespace2Hyphens,
} from "./string";

describe("isLink", () => {
  test.each([
    ["ftp://www.example.com", true],
    ["http://www.example.com", true],
    ["mailto://johndoe@example.com", true],
    [" ftp://www.example.com ", true],
    [" mailto://johndoe@example.com ", true],
    ["ftp://www.foo$#@!Bar^&*Baz.com", true],
    ["http://www.1234567890.com", true],
    ["mailto://foo😁@example.com", true],
    ["foo$#@!Bar^&*Baz", false],
    ["1234567890", false],
    ["foo😁", false],
    ["😁foo", false],
    ["", false],
  ])('isLink("%s") => "%s"', (input, expected) => {
    expect(isLink(input)).toBe(expected);
  });
});

describe("addSpaces", () => {
  test.each([
    ["fooBar", "foo Bar"],
    ["foo Bar", "foo Bar"],
    ["fooBarBaz", "foo Bar Baz"],
    [" fooBar ", " foo Bar "],
    ["foo$#@!Bar^&*Baz", "foo$#@!Bar^&*Baz"],
    ["1234567890", "1234567890"],
    ["foo😁", "foo😁"],
    ["😁foo", "😁foo"],
    ["", ""],
  ])('addSpaces("%s") => "%s"', (input, expected) => {
    expect(addSpaces(input)).toBe(expected);
  });
});

describe("removeSpecialChars", () => {
  test.each([
    ["foo", "foo"],
    ["f_o-o o", "f_o-o o"],
    ["f$#@!o^&*o", "foo"],
    ["1234567890", "1234567890"],
    ["😁", ""],
  ])('removeSpecialChars("%s") => "%s"', (input, expected) => {
    expect(removeSpecialChars(input)).toBe(expected);
  });
});

describe("slugify", () => {
  // These values come from the Django test suite.
  test.each([
    ["Hello, World!", "hello-world"],
    ["spam & eggs", "spam-eggs"],
    [" multiple---dash and  space ", "multiple-dash-and-space"],
    ["\t whitespace-in-value \n", "whitespace-in-value"],
    ["underscore_in-value", "underscore_in-value"],
    ["__strip__underscore-value___", "strip__underscore-value"],
    ["--strip-dash-value---", "strip-dash-value"],
    ["__strip-mixed-value---", "strip-mixed-value"],
    ["_ -strip-mixed-value _-", "strip-mixed-value"],
    ["", ""],
  ])('slugify("%s") => "%s"', (input, expected) => {
    expect(slugify(input)).toBe(expected);
  });
});

describe("strip", () => {
  test.each([
    // Single needle
    ["-foo-bar-", "-", "foo-bar"],
    ["-foo-bar😁-", "-", "foo-bar😁"],
    ["😁foo😁bar😁", "😁", "foo😁bar"],
    ["--foo-bar--", "-", "foo-bar"],
    ["--foo-bar😁--", "-", "foo-bar😁"],
    ["😁😁foo😁bar😁😁", "😁", "foo😁bar"],
    ["", "😁", ""],
    ["😁", "", "😁"],
    ["", "", ""],

    // Multiple needles
    ["-_foo-bar-_", "-_", "foo-bar"],
    ["-_foo-bar😁-_", "-_", "foo-bar😁"],
    ["😁🦒foo😁🦒bar🦒😁", "🦒😁", "foo😁🦒bar"],
    ["-__-foo-bar-__-", "-_", "foo-bar"],
    ["-__-foo-bar😁-__-", "-_", "foo-bar😁"],
    ["😁🦒🦒😁foo😁🦒bar🦒🦒😁", "🦒😁", "foo😁🦒bar"],
    ["", "🦒😁", ""],
  ])('strip("%s", "%s") => "%s"', (input, needles, expected) => {
    expect(strip(input, needles)).toBe(expected);
  });
});

describe("stripStart", () => {
  test.each([
    // Single needle
    ["-foo-bar", "-", "foo-bar"],
    ["-foo-bar😁", "-", "foo-bar😁"],
    ["😁foo😁bar", "😁", "foo😁bar"],
    ["--foo-bar", "-", "foo-bar"],
    ["--foo-bar😁", "-", "foo-bar😁"],
    ["😁😁foo😁bar", "😁", "foo😁bar"],
    ["", "😁", ""],
    ["😁", "", "😁"],
    ["", "", ""],

    // Multiple needles
    ["-_foo-bar", "-_", "foo-bar"],
    ["-_foo-bar😁", "-_", "foo-bar😁"],
    ["😁🦒foo😁🦒bar", "🦒😁", "foo😁🦒bar"],
    ["-__-foo-bar", "-_", "foo-bar"],
    ["-__-foo-bar😁", "-_", "foo-bar😁"],
    ["😁🦒🦒😁foo😁🦒bar", "🦒😁", "foo😁🦒bar"],
    ["", "🦒😁", ""],
  ])('stripStart("%s", "%s") => "%s"', (input, needles, expected) => {
    expect(stripStart(input, needles)).toBe(expected);
  });
});

describe("stripEnd", () => {
  test.each([
    // Single needle
    ["foo-bar-", "-", "foo-bar"],
    ["foo-bar😁-", "-", "foo-bar😁"],
    ["foo😁bar😁", "😁", "foo😁bar"],
    ["foo-bar--", "-", "foo-bar"],
    ["foo-bar😁--", "-", "foo-bar😁"],
    ["foo😁bar😁😁", "😁", "foo😁bar"],
    ["", "😁", ""],
    ["😁", "", "😁"],
    ["", "", ""],

    // Multiple needles
    ["foo-bar-_", "-_", "foo-bar"],
    ["foo-bar😁-_", "-_", "foo-bar😁"],
    ["foo😁🦒bar😁🦒", "🦒😁", "foo😁🦒bar"],
    ["foo-bar-__-", "-_", "foo-bar"],
    ["foo-bar😁-__-", "-_", "foo-bar😁"],
    ["foo😁🦒bar🦒🦒😁", "🦒😁", "foo😁🦒bar"],
    ["", "🦒😁", ""],
  ])('stripEnd("%s", "%s") => "%s"', (input, needles, expected) => {
    expect(stripEnd(input, needles)).toBe(expected);
  });
});

describe("toASCII", () => {
  test.each([
    ["café", "cafe"],
    ["façade", "facade"],
    ["élève", "eleve"],
    ["über", "uber"],
    ["中文", ""],
    ["😁", ""],
  ])('toASCII("%s") => "%s"', (input, expected) => {
    expect(toASCII(input)).toBe(expected);
  });
});

describe("ucFirst", () => {
  test.each([
    ["foo", "Foo"],
    ["foo bar", "Foo bar"],
    [" foo ", " Foo "],
    ["f$#@!o^&*o", "F$#@!o^&*o"],
    ["1234567890", "1234567890"],
    ["foo😁", "Foo😁"],
    ["😁foo", "😁foo"],
    ["", ""],
  ])('ucFirst("%s") => "%s"', (input, expected) => {
    expect(ucFirst(input)).toBe(expected);
  });
});

describe("title", () => {
  test.each([
    ["foo", "Foo"],
    ["foo bar", "Foo Bar"],
    [" foo ", " Foo "],
    ["f$#@!o^&*o", "F$#@!o^&*o"],
    ["1234567890", "1234567890"],
    ["foo😁", "Foo😁"],
    ["😁foo", "😁foo"],
    ["", ""],
  ])('title("%s") => "%s"', (input, expected) => {
    expect(title(input)).toBe(expected);
  });
});

describe("string2Title", () => {
  test.each([
    ["foo", undefined, "Foo"],
    ["foo-bar", undefined, "Foo Bar"],
    ["foo-barBaz", undefined, "Foo Bar Baz"],
    [" foo-bar ", undefined, " Foo Bar "],
    ["fooBar😁", undefined, "Foo Bar😁"],

    ["foo", {}, "Foo"],
    ["foo-bar", {}, "Foo Bar"],
    ["foo-barBaz", {}, "Foo Bar Baz"],
    [" foo-bar ", {}, " Foo Bar "],
    ["fooBar😁", {}, "Foo Bar😁"],
    ["foo_bar", {}, "Foo Bar"],

    ["foo", { addSpaces: false }, "Foo"],
    ["foo-bar", { addSpaces: false }, "Foo Bar"],
    ["foo-barBaz", { addSpaces: false }, "Foo BarBaz"],
    [" foo-bar ", { addSpaces: false }, " Foo Bar "],
    ["fooBar😁", { addSpaces: false }, "FooBar😁"],
    ["foo_bar", { addSpaces: false }, "Foo Bar"],

    ["foo", { hyphens2Whitespace: false }, "Foo"],
    ["foo-bar", { hyphens2Whitespace: false }, "Foo-bar"],
    ["foo-barBaz", { hyphens2Whitespace: false }, "Foo-bar Baz"],
    [" foo-bar ", { hyphens2Whitespace: false }, " Foo-bar "],
    ["fooBar😁", { hyphens2Whitespace: false }, "Foo Bar😁"],
    ["foo_bar", { hyphens2Whitespace: false }, "Foo_bar"],

    ["foo", { lowerCase: true }, "foo"],
    ["foo-bar", { lowerCase: true }, "foo bar"],
    ["foo-barBaz", { lowerCase: true }, "foo bar baz"],
    [" foo-bar ", { lowerCase: true }, " foo bar "],
    ["fooBar😁", { lowerCase: true }, "foo bar😁"],
    ["foo_bar", { lowerCase: true }, "foo bar"],

    ["foo", { title: false }, "foo"],
    ["foo-bar", { title: false }, "foo bar"],
    ["foo-barBaz", { title: false }, "foo bar Baz"],
    [" foo-bar ", { title: false }, " foo bar "],
    ["fooBar😁", { title: false }, "foo Bar😁"],
    ["foo_bar", { title: false }, "foo bar"],

    ["foo", { ucFirst: true }, "Foo"],
    ["foo-bar", { ucFirst: true }, "Foo bar"],
    ["foo-barBaz", { ucFirst: true }, "Foo bar Baz"],
    [" foo-bar ", { ucFirst: true }, " Foo bar "],
    ["fooBar😁", { ucFirst: true }, "Foo Bar😁"],
    ["foo_bar", { ucFirst: true }, "Foo bar"],

    ["foo", { addSpaces: true, lowerCase: true, ucFirst: true }, "Foo"],
    ["foo-bar", { addSpaces: true, lowerCase: true, ucFirst: true }, "Foo bar"],
    [
      "foo-barBaz",
      { addSpaces: true, lowerCase: true, ucFirst: true },
      "Foo bar baz",
    ],
    [
      " foo-bar ",
      { addSpaces: true, lowerCase: true, ucFirst: true },
      " Foo bar ",
    ],
    [
      "fooBar😁",
      { addSpaces: true, lowerCase: true, ucFirst: true },
      "Foo bar😁",
    ],
    ["foo_bar", { addSpaces: true, lowerCase: true, ucFirst: true }, "Foo bar"],
  ] as [string, String2TitleOptions, string][])(
    'title("%s") => "%s"',
    (input, options: String2TitleOptions, expected) => {
      expect(string2Title(input, options)).toBe(expected);
    },
  );
});

describe("whitespace2Hyphens", () => {
  test.each([
    ["foo bar", "foo-bar"],
    ["Foo bar", "Foo-bar"],
    [" foo bar ", " foo-bar "],
    ["f$#@! o^&*o", "f$#@!-o^&*o"],
    ["12345-67890", "12345-67890"],
    ["foo 😁", "foo-😁"],
    ["", ""],
  ])('whitespace2Hyphens("%s") => "%s"', (input, expected) => {
    expect(whitespace2Hyphens(input)).toBe(expected);
  });
});

describe("hyphens2Whitespace", () => {
  test.each([
    ["foo-bar", "foo bar"],
    ["Foo-bar", "Foo bar"],
    [" foo-bar ", " foo bar "],
    [" foo--bar ", " foo bar "],
    [" -foo-bar- ", "  foo bar  "],
    ["f$#@!-o^&*o", "f$#@! o^&*o"],
    ["12345-67890", "12345 67890"],
    ["foo-😁", "foo 😁"],
    ["", ""],
  ])('hyphens2Whitespace("%s") => "%s"', (input, expected) => {
    expect(hyphens2Whitespace(input)).toBe(expected);
  });
});
