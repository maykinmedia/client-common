import { expect } from "vitest";

import { delay } from "../delay";

describe("delay", () => {
  test("should return a Promise", () => {
    const promise = delay();
    expect(promise).toBeInstanceOf(Promise);
  });

  test("should resolve after 300ms", () =>
    new Promise<void>((done) => {
      const started = Date.now();
      let resolved: number | null = null;
      const promise = delay();
      promise.then(() => {
        resolved = Date.now();
      });

      setTimeout(() => {
        expect(resolved).toBeGreaterThanOrEqual(started + 300);
        done();
      }, 300);
    }));

  test("should allow a custom timeout te be passed", () =>
    new Promise<void>((done) => {
      const started = Date.now();
      let resolved: number | null = null;
      const promise = delay(10);
      promise.then(() => {
        resolved = Date.now();
      });

      setTimeout(() => {
        expect(resolved).toBeGreaterThanOrEqual(started + 10);
        done();
      }, 10);
    }));
});
