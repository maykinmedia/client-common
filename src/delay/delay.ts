/**
 * Returns a `Promise` which resolves after the specified timeout.
 *
 * @param timeout - Time in milliseconds to wait before resolving. Defaults to 300.
 */
export function delay(timeout = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
