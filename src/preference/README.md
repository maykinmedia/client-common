# Preference Management

This module provides functions to manage user preferences using `localStorage`. Preferences are stored in various types,
such as strings, numbers, bigints, booleans, null values, and objects. The values are serialized and deserialized to
ensure they can be properly stored and retrieved.

## Installation

This utility is part of a larger project and does not require separate installation. Ensure it is included in your
project’s dependencies.

## Configuration

The behavior is configurable via environment variables:

- `KEY_PREFIX`: A prefix for the localStorage keys, which is retrieved from an environment
  variable (`MYKN_PREFERENCE_PREFIX`). If the environment variable is not set, it defaults to `"mykn.lib.preference"`.

## API

### `getPreference<T = undefined>(key: string): Promise<T | undefined>`

Retrieves a preference value from `localStorage`.

- **Parameters:**
  - `key` (string): The key used to identify the preference.
- **Returns:**
  - A promise that resolves to the preference value, or `undefined` if the preference is not set.

### `setPreference<T>(key: string, value: T): Promise<void>`

Sets a preference value in `localStorage`.

- **Parameters:**
  - `key` (string): The key used to identify the preference.
  - `value` (T): The value to be stored. The value must be one of: `string`, `number`, `bigint`, `boolean`, `null`,
    or `object`.
- **Returns:**
  - A promise that resolves once the value is set.

### `clearPreference(key: string): Promise<void>`

Clears a preference from `localStorage`.

- **Parameters:**
  - `key` (string): The key identifying the preference to be cleared.
- **Returns:**
  - A promise that resolves once the preference is cleared.

## Internal Helpers

### `_getComputedKey(key: string): string`

Generates a prefixed key for `localStorage`.

- **Parameters:**
  - `key` (string): The key identifying the preference.
- **Returns:**
  - The prefixed key, which combines a configurable prefix (`MYKN_PREFERENCE_PREFIX`) and the provided `key`.

## Notes

- All preferences are serialized before being stored in `localStorage`.
- Objects are stored as JSON
