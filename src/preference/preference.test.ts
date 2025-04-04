import { beforeEach } from "vitest";

import {
  PREFERENCE_CONFIG,
  clearPreference,
  getPreference,
  setPreference,
} from "./preference";

describe("PREFERENCE_CONFIG", () => {
  test("should read", () => {
    expect(PREFERENCE_CONFIG.KEY_PREFIX).not.toBeUndefined();
  });

  test("should write", () => {
    PREFERENCE_CONFIG.KEY_PREFIX = "test.preference_config.key_prefix";
    expect(PREFERENCE_CONFIG.KEY_PREFIX).toBe(
      "test.preference_config.key_prefix",
    );
  });
});

describe("getPreference", () => {
  beforeEach(() => {
    PREFERENCE_CONFIG.KEY_PREFIX = "test.preference_config.key_prefix";
    localStorage.clear();
  });

  it("should retrieve a stored string preference", async () => {
    localStorage.setItem(
      "test.preference_config.key_prefix.testKey",
      JSON.stringify({ type: "string", value: "testValue" }),
    );
    const result = await getPreference<string>("testKey");
    expect(result).toBe("testValue");
  });

  it("should retrieve a stored number preference", async () => {
    localStorage.setItem(
      "test.preference_config.key_prefix.testKey",
      JSON.stringify({ type: "number", value: "1" }),
    );
    const result = await getPreference<number>("testKey");
    expect(result).toBe(1);
  });

  it("should retrieve a stored BigInt preference", async () => {
    localStorage.setItem(
      "test.preference_config.key_prefix.testKey",
      JSON.stringify({ type: "bigint", value: "1" }),
    );
    const result = await getPreference<number>("testKey");
    expect(result).toBe(BigInt(1));
  });

  it("should retrieve a stored boolean preference", async () => {
    localStorage.setItem(
      "test.preference_config.key_prefix.testKey",
      JSON.stringify({ type: "boolean", value: "true" }),
    );
    const result = await getPreference<boolean>("testKey");
    expect(result).toBe(true);
  });

  it("should retrieve a stored null preference", async () => {
    localStorage.setItem(
      "test.preference_config.key_prefix.testKey",
      JSON.stringify({ type: "null", value: "null" }),
    );
    const result = await getPreference<null>("testKey");
    expect(result).toBe(null);
  });

  it("should retrieve a stored object preference", async () => {
    const obj = { a: 1, b: "test" };
    localStorage.setItem(
      "test.preference_config.key_prefix.testKey",
      JSON.stringify({ type: "json", value: JSON.stringify(obj) }),
    );
    const result = await getPreference<object>("testKey");
    expect(result).toEqual(obj);
  });

  it("should return undefined for a non-existent key", async () => {
    const result = await getPreference<string>("nonExistentKey");
    expect(result).toBeUndefined();
  });
});

describe("setPreference", () => {
  beforeEach(() => {
    PREFERENCE_CONFIG.KEY_PREFIX = "test.preference_config.key_prefix";
    localStorage.clear();
  });

  it("should store a string preference", async () => {
    await setPreference<string>("testKey", "testValue");
    const stored = JSON.parse(
      localStorage.getItem("test.preference_config.key_prefix.testKey")!,
    );
    expect(stored).toEqual({ type: "string", value: "testValue" });
  });

  it("should store a number preference", async () => {
    await setPreference<number>("testKey", 1);
    const stored = JSON.parse(
      localStorage.getItem("test.preference_config.key_prefix.testKey")!,
    );
    expect(stored).toEqual({ type: "number", value: 1 });
  });

  it("should store a boolean preference", async () => {
    await setPreference<boolean>("testKey", true);
    const stored = JSON.parse(
      localStorage.getItem("test.preference_config.key_prefix.testKey")!,
    );
    expect(stored).toEqual({ type: "boolean", value: true });
  });

  it("should store a null preference", async () => {
    await setPreference<null>("testKey", null);
    const stored = JSON.parse(
      localStorage.getItem("test.preference_config.key_prefix.testKey")!,
    );
    expect(stored).toEqual({ type: "null", value: null });
  });

  it("should store an object preference", async () => {
    const obj = { a: 1, b: "test" };
    await setPreference<Record<string, number | string>>("testKey", obj);
    const stored = JSON.parse(
      localStorage.getItem("test.preference_config.key_prefix.testKey")!,
    );
    expect(stored).toEqual({ type: "json", value: JSON.stringify(obj) });
  });

  it("should throw an error for unsupported types like function", async () => {
    const fn = () => {};
    await expect(setPreference("testKey", fn)).rejects.toThrow(
      "Function values are not supported as preference.",
    );

    const symbol = Symbol();
    // @ts-expect-error - Testing invalid value here.
    await expect(setPreference("testKey", symbol)).rejects.toThrow(
      "Symbol values are not supported as preference.",
    );
  });
});

describe("clearPreference", () => {
  beforeEach(() => {
    PREFERENCE_CONFIG.KEY_PREFIX = "test.preference_config.key_prefix";
    localStorage.clear();
  });

  it("should clear a stored preference", async () => {
    await setPreference("testKey", "testValue");
    await clearPreference("testKey");
    expect(await getPreference("testKey")).toBeUndefined();
  });
});
