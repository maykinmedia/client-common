[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [timing](../README.md) / DebouncedFunction

# Type Alias: DebouncedFunction()\<T\>

> **DebouncedFunction**\<`T`\> = `void`

A debounced version of a function, delaying its execution until after a
specified timeout has elapsed since the last call.

The returned function has an additional `cancel` method to clear any pending
invocation.

## Type Parameters

### T

`T` *extends* (...`args`) => `void`

> **DebouncedFunction**(...`args`): `void`

A debounced version of a function, delaying its execution until after a
specified timeout has elapsed since the last call.

The returned function has an additional `cancel` method to clear any pending
invocation.

## Parameters

### args

...`Parameters`\<`T`\>

Arguments to pass to the original function.

## Returns

`void`

## Properties

### cancel()

> **cancel**: () => `void`

Cancels any scheduled execution of the debounced function.

#### Returns

`void`
