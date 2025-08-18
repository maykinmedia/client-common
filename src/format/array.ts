/**
 * Returns a new array with duplicates removed, based on the given key.
 *
 * - If `priority` is `"last"` (default), keeps the last occurrence of each duplicate.
 * - If `priority` is `"first"`, keeps the first occurrence of each duplicate.
 *
 * @typeParam T - Element type of the array
 * @param array - Input array
 * @param key - Property key used to determine uniqueness
 * @param priority - Whether to prefer the first or last occurrence of duplicates
 * @returns A new array with unique elements
 */
export const distinctArray = <T, K extends keyof T>(
  array: ReadonlyArray<T>,
  key: K,
  priority: "first" | "last" = "last",
): T[] => {
  const map = new Map<T[K], T>();

  for (const obj of array) {
    const keyValue = obj[key];
    if (map.has(keyValue) && priority === "first") continue;
    map.set(keyValue, obj);
  }

  return [...map.values()];
};

/**
 * Ensures the input value is returned as an array.
 *
 * - If `undefinedBehavior` is `"exclude"` (default), `undefined` is ignored and returns `[]`.
 * - If `undefinedBehavior` is `"include"`, `undefined` is wrapped in an array (`[undefined]`).
 * - If `undefinedBehavior` is `"return"`, `undefined` is returned directly.
 *
 * @typeParam T - Type of the input value:
 * @param value - The value to force into an array
 * @param undefinedBehavior - How to handle `undefined` values
 * @returns The value as an array, or `undefined` if `undefinedBehavior` is `"return"`
 */
export function forceArray<T>(
  value: T | undefined,
  undefinedBehavior?: "exclude",
): T extends Array<unknown> ? T : Exclude<T, undefined>[];
export function forceArray<T>(
  value: T | undefined,
  undefinedBehavior: "include",
): T extends Array<unknown> ? T : (T | undefined)[];
export function forceArray<T>(
  value: T | undefined,
  undefinedBehavior: "return",
): T extends Array<unknown> ? T : T[] | undefined;
export function forceArray<T>(
  value: T | undefined,
  undefinedBehavior: "exclude" | "include" | "return",
): T extends Array<unknown> ? T | undefined : (T | undefined)[] | undefined;
export function forceArray<T>(
  value: T | undefined,
  undefinedBehavior: "exclude" | "include" | "return" = "exclude",
): (T | undefined)[] | T | undefined {
  if (value === undefined) {
    switch (undefinedBehavior) {
      case "exclude":
        return [];
      case "include":
        return [undefined];
      case "return":
        return undefined;
    }
  }

  return Array.isArray(value) ? value : [value];
}
