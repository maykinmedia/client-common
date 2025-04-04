import { envGet, typedEnvGet } from "../env";

/** Data written to session storage for every cache record. */
export type CacheRecord<T = unknown> = {
  timestamp: number;
  value: T;
};

/** The cache configuration */
export const CACHE_CONFIG = {
  DISABLED: typedEnvGet("MYKN_CACHE_DISABLED", false),
  KEY_PREFIX: envGet("MYKN_CACHE_PREFIX", "mykn.lib.cache"),
  MAX_AGE: typedEnvGet("MYKN_CACHE_MAX_AGE", 600000),
};

/**
 * Retrieves item from cache.
 * Note: This function is async to accommodate possible future refactors.
 * @param key - A key identifying the selection.
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
  if (CACHE_CONFIG.DISABLED) {
    return null;
  }

  const computedKey = _getComputedKey(key);
  const json = sessionStorage.getItem(computedKey);
  if (json === null) {
    return null;
  }

  const currentTimestamp = Date.now();
  try {
    const record: CacheRecord<T> = JSON.parse(json);

    if (currentTimestamp - record.timestamp > Number(CACHE_CONFIG.MAX_AGE)) {
      await cacheDelete(key);
      return null;
    }

    return record.value;
  } catch {
    console.warn("Unable to parse cache record for", computedKey);
    return null;
  }
}

/**
 * Add item to cache.
 * Note: This function is async to accommodate possible future refactors.
 * @param key - A key identifying the selection.
 * @param value - The value to cache.
 */
export async function cacheSet(key: string, value: unknown) {
  if (CACHE_CONFIG.DISABLED) {
    return;
  }

  const computedKey = _getComputedKey(key);
  const record: CacheRecord<unknown> = {
    timestamp: Date.now(),
    value: value,
  };
  const json = JSON.stringify(record);
  sessionStorage.setItem(computedKey, json);
}

/**
 * Removes item from cache.
 * Note: This function is async to accommodate possible future refactors.
 * @param key - A key identifying the selection.
 * @param startsWith - Whether to remove cache records with a key that starts with `
 *  key` (including parameterized records).
 */
export async function cacheDelete(key: string, startsWith = false) {
  const computedKey = _getComputedKey(key);
  sessionStorage.removeItem(computedKey);

  if (!startsWith) {
    return;
  }

  // Clear related keys.
  Object.keys(sessionStorage).forEach((storageKey) => {
    if (storageKey.startsWith(computedKey)) {
      sessionStorage.removeItem(storageKey);
    }
  });
}

/**
 * Returns possible cached return value of `factory`.
 * @param key - A key, that once combined with `parameters` identifies the cached return value.
 * @param factory - A function which return value should be cached, receives `params` as arguments.
 * @param params - An array of values that are passed `factory` as arguments and their stringified values are used in
 *   constructing the cache key string,
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function cacheMemo<F extends (...args: any[]) => unknown>(
  key: string,
  factory: F,
  params: Parameters<F> = [] as unknown as Parameters<F>, // Ensure params is typed correctly
): Promise<Awaited<ReturnType<F>>> {
  const _key = _getParameterizedKey(key, params);
  const cached = await cacheGet<Awaited<ReturnType<F>>>(_key);
  if (cached !== null) {
    return cached;
  }
  const value = await factory(...params);
  await cacheSet(_key, value);
  return value as Awaited<ReturnType<F>>;
}

/**
 * Computes the prefixed cache key including the prefix.
 * @param key - A key identifying the selection.
 */
function _getComputedKey(key: string): string {
  return `${CACHE_CONFIG.KEY_PREFIX}.${key}`;
}

/**
 * Returns a key (not fully computed key) containing both `key` and `params`.
 * @param key
 * @param params - Should only contain string serializable values.
 */
function _getParameterizedKey(key: string, params?: Array<unknown>): string {
  const _params = params?.map((v) => String(v));
  if (!_params || !_params.length) {
    return key;
  }
  return `${key}#${_params.join(":")}`;
}
