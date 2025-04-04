# Environment Variable Utility

This module provides functions to retrieve, convert, and compare environment variables from both Node.js and Vite
environments.

## Installation

This utility is part of a larger project and does not require separate installation. Ensure it is included in your
project's dependencies.

## API

### `envGet<T = undefined>(name: string, defaultValue?: T): string | T`

Retrieves the value of an environment variable.

- **Parameters:**
  - `name` (string): The name of the environment variable to retrieve.
  - `defaultValue` (optional): The default value if the variable is not set.
- **Returns:**
  - The environment variable value as a string or the provided default value.

### `typedEnvGet<T = undefined>(name: string, defaultValue?: T): boolean | number | string | T`

Retrieves and converts the value of an environment variable to its typed form.

- **Parameters:**
  - `name` (string): The name of the environment variable to retrieve.
  - `defaultValue` (optional): The default value if the variable is not set.
- **Returns:**
  - The environment variable as a boolean, number, string, or the default value.

### `envCompare(name: string, value: unknown, loose = true): boolean`

Compares an environment variable to a specified value.

- **Parameters:**
  - `name` (string): The name of the environment variable.
  - `value` (unknown): The value to compare against.
  - `loose` (boolean, default: `true`): If `true`, converts values to their typed form before comparing.
- **Returns:**
  - `true` if the values match, otherwise `false`.

## Internal Helpers

### `value2TypedValue<T>(value: T): T | boolean | number`

Converts a string value to its appropriate typed form.

- **Parameters:**
  - `value` (string): The value to convert.
- **Returns:**
  - The converted value as a boolean, number, or the original value if conversion is not possible.

## Notes

- The module supports both `process.env` (Node.js) and `import.meta.env` (Vite).
- Loose comparison (`envCompare`) allows for automatic type conversion before comparison.
- The `value2TypedValue` function normalizes boolean (`true`/`false`) and numeric values where applicable.
- The `value2TypedValue` function also considers "yes" as `true` and "no" as `false` when converting string values.
