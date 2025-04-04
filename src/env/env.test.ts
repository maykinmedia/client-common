import { expect } from "vitest";

import { envCompare, envGet, typedEnvGet } from "./env.ts";

describe("envGet", () => {
  test("should return undefined when name is not found", async () => {
    expect(envGet("NON_EXISTING_ENVVAR")).toBeUndefined();
  });

  test("should return string when name is found in process.env (NodeJS/Webpack)", async () => {
    process.env.EXISTING_ENVVAR = "foo";
    expect(envGet("EXISTING_ENVVAR")).toBe("foo");
  });

  test("should return string when name is found in import.meta.env (Vite)", async () => {
    import.meta.env.EXISTING_ENVVAR = "foo";
    expect(envGet("EXISTING_ENVVAR")).toBe("foo");
  });
});

describe("typedEnvGet", () => {
  test("should return undefined when name is not found", async () => {
    expect(envGet("NON_EXISTING_ENVVAR")).toBeUndefined();
  });

  test('should return true when env var is set to "true"', async () => {
    import.meta.env.EXISTING_ENVVAR = "true";
    expect(typedEnvGet("EXISTING_ENVVAR")).toBe(true);
  });

  test('should return true when env var is set to "yes"', async () => {
    import.meta.env.EXISTING_ENVVAR = "yes";
    expect(typedEnvGet("EXISTING_ENVVAR")).toBe(true);
  });

  test('should return false when env var is set to "false"', async () => {
    import.meta.env.EXISTING_ENVVAR = "false";
    expect(typedEnvGet("EXISTING_ENVVAR")).toBe(false);
  });

  test('should return false when env var is set to "no"', async () => {
    import.meta.env.EXISTING_ENVVAR = "no";
    expect(typedEnvGet("EXISTING_ENVVAR")).toBe(false);
  });

  test("should return number when env var is set to number string", async () => {
    import.meta.env.EXISTING_ENVVAR = "5";
    expect(typedEnvGet("EXISTING_ENVVAR")).toBe(5);
  });

  test("should return string when env var is set to string", async () => {
    import.meta.env.EXISTING_ENVVAR = "foo";
    expect(typedEnvGet("EXISTING_ENVVAR")).toBe("foo");
  });
});

describe("envCompare", () => {
  test("should return false when name is not found", async () => {
    expect(envCompare("NON_EXISTING_ENVVAR", false, true)).toBeFalsy();
    expect(envCompare("NON_EXISTING_ENVVAR", null, true)).toBeFalsy();
    expect(envCompare("NON_EXISTING_ENVVAR", undefined, true)).toBeFalsy();
    expect(envCompare("NON_EXISTING_ENVVAR", NaN, true)).toBeFalsy();

    expect(envCompare("NON_EXISTING_ENVVAR", false, false)).toBeFalsy();
    expect(envCompare("NON_EXISTING_ENVVAR", null, false)).toBeFalsy();
    expect(envCompare("NON_EXISTING_ENVVAR", undefined, false)).toBeFalsy();
    expect(envCompare("NON_EXISTING_ENVVAR", NaN, false)).toBeFalsy();
  });

  test("should return false when values are not loosely equal", async () => {
    import.meta.env.EXISTING_ENVVAR_BOOL = "true";
    import.meta.env.EXISTING_ENVVAR_NUMBER = "5";
    import.meta.env.EXISTING_ENVVAR_STR = "foo";
    expect(envCompare("EXISTING_ENVVAR_BOOL", false, true)).toBeFalsy();
    expect(envCompare("EXISTING_ENVVAR_NUMBER", 3, true)).toBeFalsy();
    expect(envCompare("EXISTING_ENVVAR_STR", "bar", true)).toBeFalsy();
  });

  test("should return true when values are loosely equal", async () => {
    import.meta.env.EXISTING_ENVVAR_BOOL = "true";
    import.meta.env.EXISTING_ENVVAR_NUMBER = "5";
    import.meta.env.EXISTING_ENVVAR_STR = "foo";
    expect(envCompare("EXISTING_ENVVAR_BOOL", true, true)).toBeTruthy();
    expect(envCompare("EXISTING_ENVVAR_NUMBER", 5, true)).toBeTruthy();
    expect(envCompare("EXISTING_ENVVAR_STR", "foo", true)).toBeTruthy();
  });

  test("should return false when values are not strictly equal", async () => {
    import.meta.env.EXISTING_ENVVAR_BOOL = "true";
    import.meta.env.EXISTING_ENVVAR_NUMBER = "5";
    import.meta.env.EXISTING_ENVVAR_STR = "foo";
    expect(envCompare("EXISTING_ENVVAR_BOOL", true, false)).toBeFalsy();
    expect(envCompare("EXISTING_ENVVAR_NUMBER", 5, false)).toBeFalsy();
    expect(envCompare("EXISTING_ENVVAR_STR", "bar", false)).toBeFalsy();
  });

  test("should return trie when values are strictly equal", async () => {
    import.meta.env.EXISTING_ENVVAR_BOOL = "true";
    import.meta.env.EXISTING_ENVVAR_NUMBER = "5";
    import.meta.env.EXISTING_ENVVAR_STR = "foo";
    expect(envCompare("EXISTING_ENVVAR_BOOL", "true", false)).toBeTruthy();
    expect(envCompare("EXISTING_ENVVAR_NUMBER", "5", false)).toBeTruthy();
    expect(envCompare("EXISTING_ENVVAR_STR", "foo", false)).toBeTruthy();
  });

  test("should use loose comparisons by default", async () => {
    import.meta.env.EXISTING_ENVVAR_BOOL = "true";
    expect(envCompare("EXISTING_ENVVAR_BOOL", true)).toBeTruthy();
  });
});
