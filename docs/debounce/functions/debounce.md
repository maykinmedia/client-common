[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [debounce](../README.md) / debounce

# Function: debounce()

> **debounce**\<`T`\>(`fn`, `timeout`): [`DebouncedFunction`](../type-aliases/DebouncedFunction.md)\<`T`\>

Creates a debounced version of the provided function.
The function invocation will be delayed by the given `timeout` in
milliseconds.
Subsequent calls reset the timeout timer.

## Type Parameters

### T

`T` *extends* (...`args`) => `void`

## Parameters

### fn

`T`

The function to debounce.

### timeout

`number` = `300`

Delay in milliseconds before invoking `fn`. Defaults to 300.

## Returns

[`DebouncedFunction`](../type-aliases/DebouncedFunction.md)\<`T`\>

A debounced function with a `cancel` method.
