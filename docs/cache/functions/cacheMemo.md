[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [cache](../README.md) / cacheMemo

# Function: cacheMemo()

> **cacheMemo**\<`F`\>(`key`, `factory`, `params`): `Promise`\<`Awaited`\<`ReturnType`\<`F`\>\>\>

Returns possible cached return value of `factory`.

## Type Parameters

### F

`F` *extends* (...`args`) => `unknown`

## Parameters

### key

`string`

A key, that once combined with `parameters` identifies the
  cached return value.

### factory

`F`

A function whose return value should be cached,
  receives `params` as arguments.

### params

`Parameters`\<`F`\> = `...`

An array of values that are passed to `factory` as
  arguments. Their stringified values are used in constructing the
  cache key string.

## Returns

`Promise`\<`Awaited`\<`ReturnType`\<`F`\>\>\>

A `Promise` that resolves to the cached value if found, otherwise
  the result of the factory function.
