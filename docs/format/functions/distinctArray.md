[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [format](../README.md) / distinctArray

# Function: distinctArray()

> **distinctArray**\<`T`\>(`array`, `key`, `priority`): `T`[]

Returns a new array with duplicates removed, based on the given key.

- If `priority` is `"last"` (default), keeps the last occurrence of each duplicate.
- If `priority` is `"first"`, keeps the first occurrence of each duplicate.

## Type Parameters

### T

`T` *extends* `object`

Element type of the array

## Parameters

### array

`T`[]

Input array

### key

keyof `T`

Property key used to determine uniqueness

### priority

Whether to prefer the first or last occurrence of duplicates

`"first"` | `"last"`

## Returns

`T`[]

A new array with unique elements
