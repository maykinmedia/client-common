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

[View full API documentation](../../docs/cache/README.md)
