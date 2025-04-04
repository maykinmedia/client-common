[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [cache](../README.md) / cacheDelete

# Function: cacheDelete()

> **cacheDelete**(`key`, `startsWith`): `Promise`\<`void`\>

Removes item from cache.
Note: This function is async to accommodate possible future refactors.

## Parameters

### key

`string`

A key identifying the selection.

### startsWith

`boolean` = `false`

Whether to remove cache records with a key that starts with `
 key` (including parameterized records).

## Returns

`Promise`\<`void`\>
