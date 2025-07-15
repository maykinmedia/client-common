[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [form](../README.md) / serializeFormElement

# Function: serializeFormElement()

> **serializeFormElement**\<`T`\>(`form`, `options`?): `T`

Serializes an HTML form into a typed object by collecting values from all named form controls.

Iterates over all named elements in the form and maps each serialized value to its
corresponding key in the returned object.

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `unknown`\>

The expected structure of the output object.

## Parameters

### form

`HTMLFormElement`

The HTMLFormElement instance to serialize.

### options?

[`SerializeOptions`](../type-aliases/SerializeOptions.md)

Options for serialisation.

## Returns

`T`

An object of type T containing serialized form data keyed by element names.
