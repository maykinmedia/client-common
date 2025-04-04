[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [cache](../README.md) / cacheGet

# Function: cacheGet()

> **cacheGet**\<`T`\>(`key`): `Promise`\<`null` \| `T`\>

Retrieves item from cache.
Note: This function is async to accommodate possible future refactors.

## Type Parameters

### T

`T`

## Parameters

### key

`string`

A key identifying the cache record.

## Returns

`Promise`\<`null` \| `T`\>

A `Promise` that resolves to the cached value if found and valid, otherwise `null`.
