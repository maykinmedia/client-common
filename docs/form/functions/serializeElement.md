[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [form](../README.md) / serializeElement

# Function: serializeElement()

## Call Signature

> **serializeElement**\<`TypedFallback`, `SO`\>(`element`, `options`): `SerializedValue`\<`SO`\>

Serializes a single form control element or group of controls.

Determines the element type and delegates to the appropriate serialization function.
Currently, supports input, select, textarea, and RadioNodeList elements.

### Type Parameters

#### TypedFallback

`TypedFallback`

Type of value to for empty inputs when typed.

#### SO

`SO` *extends* `Partial`\<[`SerializeOptions`](../type-aliases/SerializeOptions.md)\<`TypedFallback`\>\> & `object`

Serialization options.

### Parameters

#### element

The form control or RadioNodeList to serialize.

`Element` | `RadioNodeList`

#### options

`SO`

Options for serialization.

### Returns

`SerializedValue`\<`SO`\>

The serialized value of the element, or undefined if unsupported.

## Call Signature

> **serializeElement**\<`TypedFallback`, `SO`\>(`element`, `options`?): `SerializedValue`\<`SO`\>

Serializes a single form control element or group of controls.

Determines the element type and delegates to the appropriate serialization function.
Currently, supports input, select, textarea, and RadioNodeList elements.

### Type Parameters

#### TypedFallback

`TypedFallback`

Type of value to for empty inputs when typed.

#### SO

`SO` *extends* `Partial`\<[`SerializeOptions`](../type-aliases/SerializeOptions.md)\<`TypedFallback`\>\> & `object`

Serialization options.

### Parameters

#### element

The form control or RadioNodeList to serialize.

`Element` | `RadioNodeList`

#### options?

`SO`

Options for serialization.

### Returns

`SerializedValue`\<`SO`\>

The serialized value of the element, or undefined if unsupported.
