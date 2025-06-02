import { describe, expect, test } from "vitest";

import { isDevelopmentBuild, isProductionBuild } from "./mode.ts";

describe("isDevelopmentBuild", () => {
  test("return `false` when env is `undefined`", () => {
    vi.stubEnv("NODE_ENV", undefined);
    expect(isDevelopmentBuild()).toBe(false);
  });

  test("return `true` when env is `development`", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(isDevelopmentBuild()).toBe(true);
  });

  test("return `false` when env is `production`", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(isDevelopmentBuild()).toBe(false);
  });
});

describe("isProductionBuild", () => {
  test("return `false` when env is `undefined`", () => {
    vi.stubEnv("NODE_ENV", undefined);
    expect(isProductionBuild()).toBe(false);
  });

  test("return `false` when env is `development`", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(isProductionBuild()).toBe(false);
  });

  test("return `true` when env is `production`", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(isProductionBuild()).toBe(true);
  });
});
