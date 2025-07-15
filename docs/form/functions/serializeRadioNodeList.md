[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [form](../README.md) / serializeRadioNodeList

# Function: serializeRadioNodeList()

> **serializeRadioNodeList**(`radioNodeList`, `options`?): `undefined` \| `string` \| `string`[]

Serializes a RadioNodeList, which can represent radios, checkboxes, or other grouped inputs.

Behavior:
- For radios: returns the selected value, or undefined if none selected.
- For checkboxes: returns an array of checked values.
- For other grouped inputs: returns an array of serialized values.

Note: RadioNodeList includes all elements sharing the same `name` attribute,
not only radio buttons.

## Parameters

### radioNodeList

`RadioNodeList`

The RadioNodeList to serialize.

### options?

[`SerializeOptions`](../type-aliases/SerializeOptions.md)

Options for serialisation.

## Returns

`undefined` \| `string` \| `string`[]

A string, an array of strings, or undefined depending on input type and selection.
