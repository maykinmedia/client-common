import { MockInstance, beforeEach, expect } from "vitest";

import * as env from "../env";
import { deprecated, invariant } from "./assert.ts";

let spy: MockInstance;

describe("deprecated", () => {
  beforeEach(() => {
    spy = vi.spyOn(console, "warn").mockImplementation(() => null);
    vi.spyOn(env, "isDevelopmentBuild").mockReturnValue(true);
  });

  test("pass if condition is not met", () => {
    deprecated(false, "foo", "Use bar instead", "3.0");
    expect(spy).not.toHaveBeenCalled();
  });

  test("warn if condition is met", () => {
    deprecated(true, "foo", "Use bar instead", "3.0");
    expect(spy).toHaveBeenCalledWith(
      "DEPRECATED: foo (will be removed in version 3.0). Use bar instead.",
    );
  });

  test("not warn if condition is met and build environment is not development", () => {
    vi.spyOn(env, "isDevelopmentBuild").mockReturnValue(false);
    deprecated(true, "foo", "Use bar instead", "3.0");
    expect(spy).not.toHaveBeenCalled();
  });

  test.each(
    // prettier-ignore
    [
      [true, "foo", undefined, undefined, "DEPRECATED: foo."],
      [true, "foo", "Use bar instead", undefined, "DEPRECATED: foo. Use bar instead."],
      [true, "foo", "Use bar instead.", undefined, "DEPRECATED: foo. Use bar instead."],
      [true, "foo", "Use bar instead", "3.0", "DEPRECATED: foo (will be removed in version 3.0). Use bar instead."],
      [true, "foo", "Use bar instead.", "3.0", "DEPRECATED: foo (will be removed in version 3.0). Use bar instead."],
      [true, "foo", undefined, "3.0", "DEPRECATED: foo (will be removed in version 3.0)."]
    ],
  )(
    'deprecated(%s, %s, %s, %s) => "%s"',
    (condition, name, alternative, removedInVersion, message) => {
      deprecated(condition, name, alternative, removedInVersion);
      expect(spy).toHaveBeenCalledWith(message);
    },
  );
});

describe("invariant", () => {
  test("pass if condition is met", () => {
    expect(() =>
      invariant(true, "foo is not implemented, did you mean bar?"),
    ).not.toThrowError();
  });

  test("throw if condition is not met in development", () => {
    vi.spyOn(env, "isDevelopmentBuild").mockReturnValue(true);
    vi.spyOn(env, "isProductionBuild").mockReturnValue(false);
    expect(() =>
      invariant(false, "foo is not implemented, did you mean bar?"),
    ).toThrowError("INVARIANT: foo is not implemented, did you mean bar?");
  });

  test("throw if condition is not met in production", () => {
    vi.spyOn(env, "isDevelopmentBuild").mockReturnValue(false);
    vi.spyOn(env, "isProductionBuild").mockReturnValue(true);
    expect(() =>
      invariant(false, "foo is not implemented, did you mean bar?"),
    ).toThrowError("INVARIANT: foo is not implemented, did you mean bar?");
  });

  test("allow message to be omitted", () => {
    expect(() => invariant(false)).toThrowError(
      "INVARIANT: Invariant violation",
    );
  });
});
