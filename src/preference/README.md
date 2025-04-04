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

[View full API documentation](../../docs/preference/README.md)
