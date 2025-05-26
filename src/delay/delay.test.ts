import { expect } from "vitest";

import { delay } from "../delay";

describe("delay", () => {
  vi.useFakeTimers();

  afterEach(() => {
    vi.clearAllTimers();
  });

  test("should return a Promise", async () => {
    const promise = delay();
    expect(promise).toBeInstanceOf(Promise);
  });

  test("should resolve after 300ms", async () => {
    let resolved = false;
    const promise = delay();
    promise.then(() => {
      resolved = true;
    });

    vi.advanceTimersByTime(299);
    expect(resolved).toBe(false);

    vi.advanceTimersByTime(1);
    await Promise.resolve();

    expect(resolved).toBe(true);
  });

  test("should allow a custom timeout te be passed", async () => {
    let resolved = false;
    const promise = delay(10);
    promise.then(() => {
      resolved = true;
    });

    vi.advanceTimersByTime(9);
    expect(resolved).toBe(false);

    vi.advanceTimersByTime(1);
    await Promise.resolve();

    expect(resolved).toBe(true);
  });
});
