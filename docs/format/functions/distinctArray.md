[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [format](../README.md) / distinctArray

# Function: distinctArray()

> **distinctArray**\<`T`, `K`\>(`array`, `key`, `priority`): `T`[]

Returns a new array with duplicates removed, based on the given key.

- If `priority` is `"last"` (default), keeps the last occurrence of each duplicate.
- If `priority` is `"first"`, keeps the first occurrence of each duplicate.

## Type Parameters

### T

`T`

Element type of the array

### K

`K` *extends* `string` \| `number` \| `symbol`

## Parameters

### array

readonly `T`[]

Input array

### key

`K`

Property key used to determine uniqueness

### priority

Whether to prefer the first or last occurrence of duplicates

`"first"` | `"last"`

## Returns

`T`[]

A new array with unique elements
