[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [form](../README.md) / serializeElement

# Function: serializeElement()

> **serializeElement**(`element`, `options`?): `string` \| `number` \| `boolean` \| `void` \| `string`[] \| `Date`

Serializes a single form control element or group of controls.

Determines the element type and delegates to the appropriate serialization function.
Currently, supports input, select, textarea, and RadioNodeList elements.

## Parameters

### element

The form control or RadioNodeList to serialize.

`Element` | `RadioNodeList`

### options?

[`SerializeOptions`](../type-aliases/SerializeOptions.md)

Options for serialization.

## Returns

`string` \| `number` \| `boolean` \| `void` \| `string`[] \| `Date`

The serialized value of the element, or undefined if unsupported.
