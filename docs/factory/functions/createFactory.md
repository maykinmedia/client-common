[**@maykin-ui/client-common**](../../README.md)

***

[@maykin-ui/client-common](../../README.md) / [factory](../README.md) / createFactory

# Function: createFactory()

> **createFactory**\<`T`\>(`fixture`): `Factory`\<`T`\>

Creates a factory that produces fresh copies of `fixture`, with optional overrides,
for building test data of type `T` one at a time or in batches.

## Type Parameters

### T

`T` *extends* `object`

Type of instances to produce.

## Parameters

### fixture

`T`

The base fixture used for every object the produced factory creates.

## Returns

`Factory`\<`T`\>

A function that takes optional `values` and assigns them to a clone of `fixture`
before returning it. The function also has a `batch` method that creates `amount` objects
at once, applying either a single `values` object to all of them or an array of `values`,
one per object.

## Example

```ts
const FIXTURE_MEMBER = { nickname: "sporty", realName: "Melanie Coloma" };
const memberFactory = createFactory(FIXTURE_MEMBER);

const member = memberFactory();
// { nickname: "sporty", realName: "Melanie Coloma" }

const renamed = memberFactory({ realName: "Melanie Chisholm" });
// { nickname: "sporty", realName: "Melanie Chisholm" }

const members = memberFactory.batch(2, { realName: "Melanie Chisholm" });
// two members, each with realName "Melanie Chisholm"

const [ginger, scary] = memberFactory.batch(2, [
  { nickname: "ginger", realName: "Geri Halliwell" },
  { nickname: "scary", realName: "Melanie Brown" },
]);
```
