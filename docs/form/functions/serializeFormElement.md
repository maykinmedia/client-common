[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [form](../README.md) / serializeFormElement

# Function: serializeFormElement()

## Call Signature

> **serializeFormElement**\<`TypedFallback`, `SO`, `T`\>(`form`, `options`): `T`

Serializes an HTML form into a typed object by collecting values from all named form controls.

Iterates over all named elements in the form and maps each serialized value to its
corresponding key in the returned object.

### Type Parameters

#### TypedFallback

`TypedFallback`

Type of value to for empty inputs when typed.

#### SO

`SO` *extends* `Partial`\<[`SerializeOptions`](../type-aliases/SerializeOptions.md)\<`TypedFallback`\>\> & `object`

Serialization options.

#### T

`T` = `Record`\<`string`, [`SerializedValue`](../type-aliases/SerializedValue.md)\<`SO`\>\>

The expected structure of the output object.

### Parameters

#### form

`HTMLFormElement`

The HTMLFormElement instance to serialize.

#### options

`SO`

Options for serialization.

### Returns

`T`

An object of type T containing serialized form data keyed by element names.

## Call Signature

> **serializeFormElement**\<`TypedFallback`, `SO`, `T`\>(`form`, `options`?): `T`

Serializes an HTML form into a typed object by collecting values from all named form controls.

Iterates over all named elements in the form and maps each serialized value to its
corresponding key in the returned object.

### Type Parameters

#### TypedFallback

`TypedFallback`

Type of value to for empty inputs when typed.

#### SO

`SO` *extends* `Partial`\<[`SerializeOptions`](../type-aliases/SerializeOptions.md)\<`TypedFallback`\>\> & `object` = `Partial`\<[`SerializeOptions`](../type-aliases/SerializeOptions.md)\<`TypedFallback`\>\> & `object`

Serialization options.

#### T

`T` = `Record`\<`string`, [`SerializedValue`](../type-aliases/SerializedValue.md)\<`SO`\>\>

The expected structure of the output object.

### Parameters

#### form

`HTMLFormElement`

The HTMLFormElement instance to serialize.

#### options?

`SO`

Options for serialization.

### Returns

`T`

An object of type T containing serialized form data keyed by element names.
