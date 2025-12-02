[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [form](../README.md) / serializeRadioNodeList

# Function: serializeRadioNodeList()

## Call Signature

> **serializeRadioNodeList**\<`TypedFallback`, `SO`\>(`radioNodeList`, `options`): [`SerializedValue`](../type-aliases/SerializedValue.md)\<`SO`\> \| [`SerializedValue`](../type-aliases/SerializedValue.md)\<`SO`\>[]

Serializes a RadioNodeList, which can represent radios, checkboxes, or other grouped inputs.

Behavior:
- For radios: returns the selected value, or undefined if none selected.
- For checkboxes: returns an array of checked values.
- For other grouped inputs: returns an array of serialized values.

Note: RadioNodeList includes all elements sharing the same `name` attribute,
not only radio buttons.

### Type Parameters

#### TypedFallback

`TypedFallback`

Type of value to for empty inputs when typed.

#### SO

`SO` *extends* `Partial`\<[`SerializeOptions`](../type-aliases/SerializeOptions.md)\<`TypedFallback`\>\> & `object`

Serialization options.

### Parameters

#### radioNodeList

`RadioNodeList`

The RadioNodeList to serialize.

#### options

`SO`

Options for serialization.

### Returns

[`SerializedValue`](../type-aliases/SerializedValue.md)\<`SO`\> \| [`SerializedValue`](../type-aliases/SerializedValue.md)\<`SO`\>[]

A string, an array of strings, or undefined depending on input type and selection.

## Call Signature

> **serializeRadioNodeList**\<`TypedFallback`, `SO`\>(`radioNodeList`, `options`?): [`SerializedValue`](../type-aliases/SerializedValue.md)\<`SO`\> \| [`SerializedValue`](../type-aliases/SerializedValue.md)\<`SO`\>[]

Serializes a RadioNodeList, which can represent radios, checkboxes, or other grouped inputs.

Behavior:
- For radios: returns the selected value, or undefined if none selected.
- For checkboxes: returns an array of checked values.
- For other grouped inputs: returns an array of serialized values.

Note: RadioNodeList includes all elements sharing the same `name` attribute,
not only radio buttons.

### Type Parameters

#### TypedFallback

`TypedFallback`

Type of value to for empty inputs when typed.

#### SO

`SO` *extends* `Partial`\<[`SerializeOptions`](../type-aliases/SerializeOptions.md)\<`TypedFallback`\>\> & `object`

Serialization options.

### Parameters

#### radioNodeList

`RadioNodeList`

The RadioNodeList to serialize.

#### options?

`SO`

Options for serialization.

### Returns

[`SerializedValue`](../type-aliases/SerializedValue.md)\<`SO`\> \| [`SerializedValue`](../type-aliases/SerializedValue.md)\<`SO`\>[]

A string, an array of strings, or undefined depending on input type and selection.
