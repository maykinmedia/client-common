# Cache Utility

This module provides a simple caching mechanism using `sessionStorage`. It allows retrieving, storing, and deleting
cached items based on configurable parameters.

## Installation

This utility is part of a larger project and does not require separate installation. Ensure it is included in your
project's dependencies.

## Configuration

The cache behavior is configurable via environment variables:

- `MYKN_CACHE_DISABLED` (default: `false`): Disables caching when set to `true`.
- `MYKN_CACHE_PREFIX` (default: `mykn.lib.cache`): Prefix for all cache keys.
- `MYKN_CACHE_MAX_AGE` (default: `600000` ms): Maximum cache age in milliseconds.

## API

### `cacheGet<T>(key: string): Promise<T | null>`

Retrieves an item from the cache.

- **Parameters:**
  - `key` (string): A key identifying the cached item.
- **Returns:**
  - The cached value if it exists and is valid, otherwise `null`.

### `cacheSet(key: string, value: unknown): Promise<void>`

Stores an item in the cache.

- **Parameters:**
  - `key` (string): A key identifying the item.
  - `value` (unknown): The value to cache.

### `cacheDelete(key: string, startsWith = false): Promise<void>`

Removes an item from the cache.

- **Parameters:**
  - `key` (string): A key identifying the cached item.
  - `startsWith` (boolean, default: `false`): If `true`, removes all keys that start with the given `key`.

### `cacheMemo<F extends (...args: any[]) => unknown>(key: string, factory: F, params: Parameters<F>): Promise<Awaited<ReturnType<F>>>`

Caches the return value of a factory function.

- **Parameters:**
  - `key` (string): A key identifying the cached result.
  - `factory` (Function): The function whose return value should be cached.
  - `params` (Array): Parameters passed to the `factory` function.
- **Returns:**
  - The cached or computed value.

## Internal Helpers

### `_getComputedKey(key: string): string`

Computes the prefixed cache key.

- **Parameters:**
  - `key` (string): A key identifying the item.
- **Returns:**
  - A string containing the computed key with the prefix.

### `_getParameterizedKey(key: string, params?: Array<unknown>): string`

Generates a key incorporating parameters.

- **Parameters:**
  - `key` (string): The base key.
  - `params` (Array): Parameters converted to a string format.
- **Returns:**
  - A string representing the full key including parameters.

## Notes

- This module assumes `sessionStorage` is available in the execution environment.
- Items in the cache expire based on `MYKN_CACHE_MAX_AGE`.
- The cache is not persistent beyond the session scope.
