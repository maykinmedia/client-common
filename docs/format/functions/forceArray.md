[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [format](../README.md) / forceArray

# Function: forceArray()

## Call Signature

> **forceArray**\<`T`\>(`value`, `undefinedBehavior`?): `T` *extends* `unknown`[] ? `T`\<`T`\> : `Exclude`\<`T`, `undefined`\>[]

Ensures the input value is returned as an array.

- If `undefinedBehavior` is `"exclude"` (default), `undefined` is ignored and returns `[]`.
- If `undefinedBehavior` is `"include"`, `undefined` is wrapped in an array (`[undefined]`).
- If `undefinedBehavior` is `"return"`, `undefined` is returned directly.

### Type Parameters

#### T

`T`

Type of the input value:

### Parameters

#### value

The value to force into an array

`undefined` | `T`

#### undefinedBehavior?

`"exclude"`

How to handle `undefined` values

### Returns

`T` *extends* `unknown`[] ? `T`\<`T`\> : `Exclude`\<`T`, `undefined`\>[]

The value as an array, or `undefined` if `undefinedBehavior` is `"return"`

## Call Signature

> **forceArray**\<`T`\>(`value`, `undefinedBehavior`): `T` *extends* `unknown`[] ? `T`\<`T`\> : (`undefined` \| `T`)[]

Ensures the input value is returned as an array.

- If `undefinedBehavior` is `"exclude"` (default), `undefined` is ignored and returns `[]`.
- If `undefinedBehavior` is `"include"`, `undefined` is wrapped in an array (`[undefined]`).
- If `undefinedBehavior` is `"return"`, `undefined` is returned directly.

### Type Parameters

#### T

`T`

Type of the input value:

### Parameters

#### value

The value to force into an array

`undefined` | `T`

#### undefinedBehavior

`"include"`

How to handle `undefined` values

### Returns

`T` *extends* `unknown`[] ? `T`\<`T`\> : (`undefined` \| `T`)[]

The value as an array, or `undefined` if `undefinedBehavior` is `"return"`

## Call Signature

> **forceArray**\<`T`\>(`value`, `undefinedBehavior`): `T` *extends* `unknown`[] ? `T`\<`T`\> : `undefined` \| `T`[]

Ensures the input value is returned as an array.

- If `undefinedBehavior` is `"exclude"` (default), `undefined` is ignored and returns `[]`.
- If `undefinedBehavior` is `"include"`, `undefined` is wrapped in an array (`[undefined]`).
- If `undefinedBehavior` is `"return"`, `undefined` is returned directly.

### Type Parameters

#### T

`T`

Type of the input value:

### Parameters

#### value

The value to force into an array

`undefined` | `T`

#### undefinedBehavior

`"return"`

How to handle `undefined` values

### Returns

`T` *extends* `unknown`[] ? `T`\<`T`\> : `undefined` \| `T`[]

The value as an array, or `undefined` if `undefinedBehavior` is `"return"`

## Call Signature

> **forceArray**\<`T`\>(`value`, `undefinedBehavior`): `T` *extends* `unknown`[] ? `undefined` \| `T`\<`T`\> : `undefined` \| (`undefined` \| `T`)[]

Ensures the input value is returned as an array.

- If `undefinedBehavior` is `"exclude"` (default), `undefined` is ignored and returns `[]`.
- If `undefinedBehavior` is `"include"`, `undefined` is wrapped in an array (`[undefined]`).
- If `undefinedBehavior` is `"return"`, `undefined` is returned directly.

### Type Parameters

#### T

`T`

Type of the input value:

### Parameters

#### value

The value to force into an array

`undefined` | `T`

#### undefinedBehavior

How to handle `undefined` values

`"exclude"` | `"include"` | `"return"`

### Returns

`T` *extends* `unknown`[] ? `undefined` \| `T`\<`T`\> : `undefined` \| (`undefined` \| `T`)[]

The value as an array, or `undefined` if `undefinedBehavior` is `"return"`
