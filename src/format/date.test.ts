import { expect } from "vitest";

import { invariant } from "../assert";
import { formatDate } from "./date.ts";

describe("formatDate", () => {
  test.each([
    [new Date(0), undefined, "1970-01-01"],
    [new Date(0), "iso", "1970-01-01"],
    [new Date(0), "nl", "01/01/1970"],
    [new Date("2023-09-15T21:36:00.000"), "iso", "2023-09-15"],
    [new Date("2023-09-15T21:36:00.000"), "nl", "15/09/2023"],
    [new Date("2023-09-15T21:36:00.000"), "🍌", "15/09/2023"],
  ])('formatDate("%s", "%s") => "%s"', (date, format, expected) => {
    try {
      // @ts-expect-error - deliberately failing type here.
      expect(formatDate(date, format)).toBe(expected);
    } catch (error) {
      invariant(format === "🍌");
      invariant(error instanceof Error);
      expect(error.message).toBe("Unknown date format format: 🍌");
    }
  });
});
