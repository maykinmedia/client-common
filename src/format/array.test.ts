import { describe, expect, test } from "vitest";

import { distinctArray, forceArray } from "./array.ts";

describe("distinctArray", () => {
  const FIXTURE_CANDIDATES = [
    { nickname: "ginger", realName: "Geri Halliwell" },
    { nickname: "scary", realName: "Melanie Brown" },
    { nickname: "sporty", realName: "Melanie Coloma" }, // Replaced by Melanie Chisholm
    { nickname: "baby", realName: "Emma Bunton" },
    { nickname: "posh", realName: "Victoria Beckham" },
    { nickname: "sporty", realName: "Melanie Chisholm" },
  ];

  const FIXTURE_ORIGINAL_MEMBERS = [
    { nickname: "ginger", realName: "Geri Halliwell" },
    { nickname: "scary", realName: "Melanie Brown" },
    { nickname: "sporty", realName: "Melanie Coloma" }, // Replaced by Melanie Chisholm
    { nickname: "baby", realName: "Emma Bunton" },
    { nickname: "posh", realName: "Victoria Beckham" },
  ];

  const FIXTURE_MEMBERS = [
    { nickname: "ginger", realName: "Geri Halliwell" },
    { nickname: "scary", realName: "Melanie Brown" },
    { nickname: "sporty", realName: "Melanie Chisholm" },
    { nickname: "baby", realName: "Emma Bunton" },
    { nickname: "posh", realName: "Victoria Beckham" },
  ];

  test.each([
    [FIXTURE_CANDIDATES, "nickname", undefined, FIXTURE_MEMBERS],
    [FIXTURE_CANDIDATES, "nickname", "last", FIXTURE_MEMBERS],
    [FIXTURE_CANDIDATES, "nickname", "first", FIXTURE_ORIGINAL_MEMBERS],
  ])("distinctArray($0, $1, $2) => $3", (array, key, priority, expected) => {
    expect(
      distinctArray(
        array,
        key as keyof (typeof array)[number],
        priority as "last" | "first" | undefined,
      ),
    ).toEqual(expected);
  });
});

test.each([
  ["foo", undefined, ["foo"]],
  [["foo", "bar"], undefined, ["foo", "bar"]],
  [undefined, undefined, []],
  [undefined, "exclude", []],
  [undefined, "include", [undefined]],
  [undefined, "return", undefined],
])("forceArray(%s, %s) => %p", (value, undefinedBehavior, expected) => {
  const _undefinedBehavior = undefinedBehavior as
    | "exclude"
    | "include"
    | "return";
  expect(forceArray(value, _undefinedBehavior)).toEqual(expected);
});
