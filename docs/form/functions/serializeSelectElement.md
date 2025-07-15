[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [form](../README.md) / serializeSelectElement

# Function: serializeSelectElement()

> **serializeSelectElement**(`select`): `string` \| `string`[]

Serializes an HTMLSelectElement.

If the select allows multiple selections, returns an array of selected values.
Otherwise, returns the single selected value.

## Parameters

### select

`HTMLSelectElement`

The select element to serialize.

## Returns

`string` \| `string`[]

A string or array of strings representing the selected option(s).
