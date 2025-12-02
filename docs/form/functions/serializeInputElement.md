[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [form](../README.md) / serializeInputElement

# Function: serializeInputElement()

## Call Signature

> **serializeInputElement**\<`TypedFallback`, `SO`\>(`input`, `options`): [`SerializedValue`](../type-aliases/SerializedValue.md)\<`SO`\>

Serializes an individual HTMLInputElement.

For checkboxes and radios, only returns a value if checked.
Otherwise, returns the input's value.

### Type Parameters

#### TypedFallback

`TypedFallback`

Type of value to for empty inputs when typed.

#### SO

`SO` *extends* `Partial`\<[`SerializeOptions`](../type-aliases/SerializeOptions.md)\<`TypedFallback`\>\> & `object`

Serialization options.

### Parameters

#### input

`HTMLInputElement`

The input element to serialize.

#### options

`SO`

Options for serialization.

### Returns

[`SerializedValue`](../type-aliases/SerializedValue.md)\<`SO`\>

The input's value or undefined if unchecked checkbox/radio.

## Call Signature

> **serializeInputElement**\<`TypedFallback`, `SO`\>(`input`, `options`?): [`SerializedValue`](../type-aliases/SerializedValue.md)\<`SO`\>

Serializes an individual HTMLInputElement.

For checkboxes and radios, only returns a value if checked.
Otherwise, returns the input's value.

### Type Parameters

#### TypedFallback

`TypedFallback`

Type of value to for empty inputs when typed.

#### SO

`SO` *extends* `Partial`\<[`SerializeOptions`](../type-aliases/SerializeOptions.md)\<`TypedFallback`\>\> & `object`

Serialization options.

### Parameters

#### input

`HTMLInputElement`

The input element to serialize.

#### options?

`SO`

Options for serialization.

### Returns

[`SerializedValue`](../type-aliases/SerializedValue.md)\<`SO`\>

The input's value or undefined if unchecked checkbox/radio.
