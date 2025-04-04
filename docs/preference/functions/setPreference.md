[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [preference](../README.md) / setPreference

# Function: setPreference()

> **setPreference**\<`T`\>(`key`, `value`): `Promise`\<`void`\>

Sets the preference cache.
Note: This function is async to accommodate possible future refactors.

## Type Parameters

### T

`T` *extends* `null` \| `string` \| `number` \| `bigint` \| `boolean` \| `object`

## Parameters

### key

`string`

A key identifying the selection.

### value

`T`

The value to store for the given key.

## Returns

`Promise`\<`void`\>

A `Promise` that resolves once the preference is set.
