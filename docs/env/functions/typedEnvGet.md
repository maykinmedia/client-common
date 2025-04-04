[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [env](../README.md) / typedEnvGet

# Function: typedEnvGet()

> **typedEnvGet**\<`T`\>(`name`, `defaultValue`?): `string` \| `number` \| `boolean` \| `T`

Retrieves the value of an environment variable and converts it to a typed value.

This function uses `envGet` to fetch the raw value and then converts it to an
appropriate JavaScript type. Supports conversion to:

- boolean (`'true'` → `true`, `'false'` → `false`)
- yes/no (`'yes'` → `true`, `'no'` → `false`)
- number (`'123'` → `123`)

Returns the `defaultValue` if the variable is not set.

## Type Parameters

### T

`T` = `undefined`

## Parameters

### name

`string`

Name of the environment variable to retrieve.

### defaultValue?

`T`

Fallback value if the environment variable is not found.

## Returns

`string` \| `number` \| `boolean` \| `T`

The converted typed value of the environment variable or the default value.
