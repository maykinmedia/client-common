[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [env](../README.md) / envCompare

# Function: envCompare()

> **envCompare**(`name`, `value`, `loose`?): `boolean`

Compares the value of an environment variable to a specified value.

This function compares the environment variable to the provided value.
It can perform a loose comparison (converting values to their typed form) or
strict comparison (comparing raw values as strings). If no env value is found,
`false` is returned.

## Parameters

### name

`string`

The name of the environment variable to compare.

### value

`unknown`

The value to compare the environment variable to.

### loose?

`boolean` = `true`

If `true`, the comparison will be loose (values
                                 are converted to types).
                                If `false`, the comparison will be strict (raw
                                 string values are compared).

## Returns

`boolean`
