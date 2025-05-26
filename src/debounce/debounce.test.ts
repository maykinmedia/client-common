import { expect } from "vitest";

import { delay } from "../delay";
import { debounce } from "./debounce.ts";

describe("debounce", () => {
  test("should return a function", async () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn);
    expect(debouncedFn).toBeInstanceOf(Function);
  });

  test("should call fn after 300ms", async () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn);
    debouncedFn();
    expect(fn).not.toHaveBeenCalled();

    await delay(100);
    expect(fn).not.toHaveBeenCalled();

    await delay(200);
    expect(fn).toHaveBeenCalled();
  });

  test("should allow a custom timeout te be passed", async () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 10);
    debouncedFn();

    await delay(10);
    expect(fn).toHaveBeenCalled();
  });

  test("should call fn exactly once within timeout", async () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 10);
    debouncedFn();
    debouncedFn();
    debouncedFn();

    await delay(10);
    expect(fn).toHaveBeenCalledOnce();
  });

  test("should allow fn call to be cancelled explicitly within timeout", async () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 20);

    await delay(10);
    debouncedFn.cancel();

    await delay(10);
    expect(fn).not.toHaveBeenCalled();
  });

  test("should allow multiple debounced fns to operate individually", async () => {
    for (let i = 1; i <= 3; i++) {
      const timeout = i * 10;
      const fn1 = vi.fn();
      const debouncedFn1 = debounce(fn1, timeout);

      const fn2 = vi.fn();
      const debouncedFn2 = debounce(fn2, timeout);

      debouncedFn1();
      expect(fn1).not.toHaveBeenCalled();

      debouncedFn2();
      expect(fn2).not.toHaveBeenCalled();

      await delay(timeout);
      expect(fn1).toHaveBeenCalled();
      expect(fn2).toHaveBeenCalled();
    }
  });
});
