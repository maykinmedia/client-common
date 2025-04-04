[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [env](../README.md) / envGet

# Function: envGet()

> **envGet**\<`T`\>(`name`, `defaultValue`?): `string` \| `T`

Retrieves the value of an environment variable from either Node.js or Vite environment.

This function combines the environment variables from `process.env` (Node.js)
and `import.meta.env` (Vite) and returns the value of the specified variable.

## Type Parameters

### T

`T` = `undefined`

## Parameters

### name

`string`

The name of the environment variable to retrieve.

### defaultValue?

`T`

The default value.

## Returns

`string` \| `T`
