[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [form](../README.md) / serializeInputElement

# Function: serializeInputElement()

> **serializeInputElement**(`input`, `options`?): `string` \| `number` \| `boolean` \| `void` \| `Date`

Serializes an individual HTMLInputElement.

For checkboxes and radios, only returns a value if checked.
Otherwise, returns the input's value.

## Parameters

### input

`HTMLInputElement`

The input element to serialize.

### options?

[`SerializeOptions`](../type-aliases/SerializeOptions.md)

Options for serialisation.

## Returns

`string` \| `number` \| `boolean` \| `void` \| `Date`

The input's value or undefined if unchecked checkbox/radio.
