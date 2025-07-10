/**
 * A debounced version of a function, delaying its execution until after a
 * specified timeout has elapsed since the last call.
 *
 * The returned function has an additional `cancel` method to clear any pending
 * invocation.
 */
export type DebouncedFunction<T extends (...args: Parameters<T>) => void> = {
  /**
   * Invokes the debounced function.
   *
   * @param args - Arguments to pass to the original function.
   */
  (...args: Parameters<T>): void;

  /**
   * Cancels any scheduled execution of the debounced function.
   */
  cancel: () => void;
};

/**
 * Creates a debounced version of the provided function.
 * The function invocation will be delayed by the given `timeout` in
 * milliseconds.
 * Subsequent calls reset the timeout timer.
 *
 * @param fn - The function to debounce.
 * @param timeout - Delay in milliseconds before invoking `fn`. Defaults to 300.
 * @returns A debounced function with a `cancel` method.
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  timeout = 300,
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  /**
   * Clears any scheduled invocation.
   */
  const cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const debouncedFn: DebouncedFunction<T> = (...args) => {
    cancel();

    timeoutId = setTimeout(() => {
      fn(...args);
    }, timeout);
  };
  debouncedFn.cancel = cancel;

  return debouncedFn;
}

/**
 * Returns a `Promise` which resolves after the specified timeout.
 *
 * @param timeout - Time in milliseconds to wait before resolving. Defaults to 300.
 */
export function delay(timeout = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
