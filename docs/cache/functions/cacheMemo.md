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

A key, that once combined with `parameters` identifies the cached return value.

### factory

`F`

A function which return value should be cached, receives `params` as arguments.

### params

`Parameters`\<`F`\> = `...`

An array of values that are passed `factory` as arguments and their stringified values are used in
  constructing the cache key string,

## Returns

`Promise`\<`Awaited`\<`ReturnType`\<`F`\>\>\>
