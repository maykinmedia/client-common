/** Matches a URL. */
export const REGEX_URL = /^\s*[a-zA-Z][a-zA-Z0-9+.-]*:\/\/[^\s]+?\s*$/;

/**
 * Checks if the input string matches the URL pattern defined by `REGEX_URL`.
 *
 * @param string - The string to test.
 * @returns True if the string matches `REGEX_URL`, otherwise false.
 */
export function isLink(string: string): boolean {
  return REGEX_URL.test(string);
}

/**
 * Inserts spaces before uppercase letters that are immediately preceded by lowercase letters.
 *
 * For example, "fooBarBaz" becomes "foo Bar Baz".
 *
 * @param string - The input camelCase or PascalCase string.
 * @returns The string with spaces inserted before uppercase letters.
 */
export function addSpaces(string: string): string {
  return string.replace(
    /([a-z])([A-Z])/g,
    (_, lower, upper) => `${lower} ${upper}`,
  );
}

/**
 * Removes special characters except underscores, whitespace, and hyphens.
 *
 * @param input - The input string to sanitize.
 * @returns The string with special characters removed.
 */
export function removeSpecialChars(input: string): string {
  return input.replace(/[^\w\s-]/g, "");
}

/**
 * Converts a string to a URL-friendly slug.
 *
 * @param string - The input string to be slugified.
 * @returns The slugified string.
 */
export function slugify(string: string): string {
  return strip(
    whitespace2Hyphens(
      removeSpecialChars(
        toASCII(string), // Remove non-ASCII characters.
      ).toLowerCase(), // To lowercase.
    ).replace(/[-\s]+/g, "-"), // Collapse multiple hyphens/spaces.
    "-_",
  );
}

/**
 * Strips characters from both ends of a string.
 *
 * @param string - The input string to strip.
 * @param needles - The characters to strip from the start and end.
 * @returns The stripped string.
 */
export function strip(string: string, needles: string): string {
  return stripStart(stripEnd(string, needles), needles);
}

/**
 * Strips characters from the start of a string.
 *
 * @param string - The input string to strip.
 * @param needles - The characters to strip from the start.
 * @returns The stripped string.
 */
export function stripStart(string: string, needles: string): string {
  let i = 0;
  while (i < string.length && needles.includes(string[i])) {
    i++;
  }
  return string.slice(i);
}

/**
 * Strips characters from the end of a string.
 *
 * @param string - The input string to strip.
 * @param needles - The characters to strip from the end.
 * @returns The stripped string.
 */
export function stripEnd(string: string, needles: string): string {
  let i = string.length - 1;
  while (i >= 0 && needles.includes(string[i])) {
    i--;
  }
  return string.slice(0, i + 1);
}

/**
 * Converts a Unicode string to ASCII by removing accents and non-ASCII characters.
 *
 * @param string - The input string to convert.
 * @returns The ASCII-only version of the string.
 */
export function toASCII(string: string): string {
  return (
    string
      .normalize("NFKD") // Normalize to NFKD Unicode Normalization Form.
      .replace(/[\u0300-\u036f]/g, "") // Remove accents.
      // eslint-disable-next-line no-control-regex
      .replace(/[^\x00-\x7F]/g, "") // Remove non-ASCII characters.
  );
}

/**
 * Capitalizes the first non-whitespace character of a string.
 *
 * @param string - The input string to transform.
 * @returns The string with the first non-whitespace character capitalized.
 */
export function ucFirst(string: string): string {
  const firstCharIndex = string.search(/[^\s]/);
  if (firstCharIndex === -1) return string; // All whitespace.

  return (
    string.substring(0, firstCharIndex) +
    string.charAt(firstCharIndex).toUpperCase() +
    string.slice(firstCharIndex + 1)
  );
}

export function title(string: string): string {
  return string.split(/\s+/).map(ucFirst).join(" ");
}

export type String2TitleOptions = {
  addSpaces?: boolean;
  hyphens2Whitespace?: boolean;
  lowerCase?: boolean;
  title?: boolean;
  ucFirst?: boolean;
};

export const string2Title = (
  string: string,
  options?: String2TitleOptions,
): string => {
  // Set default values for options using the spread operator
  const {
    addSpaces: addSpacesBool = true,
    hyphens2Whitespace: hyphens2WhitespaceBool = true,
    lowerCase: lowerCaseBool = false,
    ucFirst: ucFirstBool = false,
    title: titleBool = !ucFirstBool,
  } = options || {};

  let result = string;

  if (addSpacesBool) {
    result = addSpaces(result);
  }

  if (hyphens2WhitespaceBool) {
    result = hyphens2Whitespace(result);
  }

  if (titleBool) {
    result = title(result);
  }

  if (lowerCaseBool) {
    result = result.toLowerCase();
  }

  if (ucFirstBool) {
    result = ucFirst(result);
  }

  return result;
};

/**
 * Replaces whitespace characters (that are followed by word characters) with hyphens,
 * while preserving leading whitespace.
 *
 * Useful for preserving indentation or formatting while making the content slug-friendly.
 *
 * @param string - The input string to transform.
 * @returns The string with selective whitespace replaced by hyphens.
 */
export function whitespace2Hyphens(string: string): string {
  const firstCharIndex = string.search(/[^\s]/);
  if (firstCharIndex === -1) return string; // All whitespace.

  return (
    string.substring(0, firstCharIndex) +
    string.slice(firstCharIndex).replace(/\s(?=[^\s])/g, "-")
  );
}

/**
 * Replaces all hyphens in the input string with spaces.
 *
 * Existing whitespace characters (spaces, tabs, etc.) are preserved and unaffected.
 *
 * @param string - The input string containing hyphens.
 * @returns A new string with all hyphens replaced by spaces.
 */
export function hyphens2Whitespace(string: string): string {
  return string.replace(/-+/g, " ");
}
