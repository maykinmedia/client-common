# Cookie Utility

This module provides a simple function to retrieve the value of a cookie from `document.cookie`.

## Installation

This utility is part of a larger project and does not require separate installation. Ensure it is included in your
project's dependencies.

## API

### `getCookie(name: string): string | null`

Retrieves the value of a cookie by its name.

- **Parameters:**
  - `name` (string): The name of the cookie to retrieve.
- **Returns:**
  - The value of the cookie as a string if it exists, otherwise `null`.

## Notes

- This function assumes `document.cookie` is accessible in the execution environment.
- It trims leading spaces in cookie values.
- If multiple cookies share a similar prefix, only an exact match is returned.
