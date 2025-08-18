[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [form](../README.md) / SerializeOptions

# Type Alias: SerializeOptions

> **SerializeOptions** = `object`

## Properties

### trimCheckboxArray

> **trimCheckboxArray**: `boolean`

Whether to shorten checkbox arrays when serializing.

- Default: `true`.
- If `true` (default), only the selected values are included in the array,
  producing a compact array like `["foo", "bar"]`. This is preferred for form serialization.
- If `false`, the array preserves the original checkbox states,
  including `true` for selected and `false` for unselected values, e.g., `[true, false, true]`.
  This is useful if index-based access is required, for example in validation lookups.

***

### typed

> **typed**: `boolean`

Whether to return typed values  according the input types.
