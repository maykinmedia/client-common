[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [form](../README.md) / SerializedValue

# Type Alias: SerializedValue\<SO\>

> **SerializedValue**\<`SO`\> = `SO` *extends* `object` ? `Typed` *extends* `true` ? [`TypedSerializedValue`](TypedSerializedValue.md)\<`SO`\> \| [`TypedSerializedValue`](TypedSerializedValue.md)\<`SO`\>[] : [`UntypedSerializedValue`](UntypedSerializedValue.md) \| [`UntypedSerializedValue`](UntypedSerializedValue.md)[] : [`UntypedSerializedValue`](UntypedSerializedValue.md) \| [`UntypedSerializedValue`](UntypedSerializedValue.md)[]

Type for a single input value based on `typed` and `typedFallback` members of
`SO` (SerializeOptions).

## Type Parameters

### SO

`SO`
