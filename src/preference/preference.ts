import { envGet } from "../env";

type StoredPreference<T> = T extends string
  ? { type: "string"; value: string }
  : T extends number
    ? { type: "number"; value: string }
    : T extends bigint
      ? { type: "bigint"; value: string }
      : T extends boolean
        ? { type: "boolean"; value: string }
        : T extends null
          ? { type: "null"; value: string }
          : T extends object
            ? { type: "json"; value: string }
            : never;

/** The cache configuration */
export const PREFERENCE_CONFIG = {
  KEY_PREFIX: envGet("MYKN_PREFERENCE_PREFIX", "mykn.lib.preference"),
};

/**
 * Gets the preference.
 * Note: This function is async to accommodate possible future refactors.
 *
 * @param key - A key identifying the selection.
 * @returns A `Promise` that resolves to the preference value, or `undefined` if not found.
 */
export async function getPreference<
  T extends string | number | bigint | boolean | null | object,
>(key: string): Promise<T | undefined> {
  const computedKey = _getComputedKey(key);
  const json = localStorage.getItem(computedKey);

  if (!json) {
    return undefined;
  }

  const { type, value } = JSON.parse(json) as StoredPreference<T>;

  switch (type) {
    case "string":
      return value as T;
    case "number":
      return Number(value) as T;
    case "bigint":
      return BigInt(value) as T;
    case "boolean":
      return Boolean(value) as T;
    case "null":
      return null as T;
    case "json":
      return JSON.parse(value);
  }
}

/**
 * Sets the preference cache.
 * Note: This function is async to accommodate possible future refactors.
 *
 * @param key - A key identifying the selection.
 * @param value - The value to store for the given key.
 * @returns A `Promise` that resolves once the preference is set.
 */
export async function setPreference<
  T extends string | number | bigint | boolean | null | object,
>(key: string, value: T): Promise<void> {
  const computedKey = _getComputedKey(key);
  const type =
    value === null ? "null" : typeof value === "object" ? "json" : typeof value;
  const jsonValue = type === "json" ? JSON.stringify(value) : value;

  switch (type) {
    case "function":
      throw new Error("Function values are not supported as preference.");
    case "symbol":
      throw new Error("Symbol values are not supported as preference.");
    default: {
      const storedPreference: StoredPreference<T> = {
        type: type,
        value: jsonValue,
      } as StoredPreference<T>;
      const json = JSON.stringify(storedPreference);
      localStorage.setItem(computedKey, json);
    }
  }
}

/**
 * Clears the preference.
 * Note: This function is async to accommodate possible future refactors.
 *
 * @param key - A key identifying the selection to clear.
 * @returns A `Promise` that resolves once the preference is cleared.
 */
export async function clearPreference(key: string): Promise<void> {
  const computedKey = _getComputedKey(key);
  localStorage.removeItem(computedKey);
}

/**
 * Computes the prefixed cache key.
 *
 * @param key - A key identifying the selection.
 * @returns The computed cache key.
 */
function _getComputedKey(key: string): string {
  return `${PREFERENCE_CONFIG.KEY_PREFIX}.${key}`;
}
