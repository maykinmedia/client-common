import { createFactory } from "./factory.ts";

const FIXTURE_MEMBER = { nickname: "sporty", realName: "Melanie Coloma" };

describe("createFactory", () => {
  it("returns a function", () => {
    const memberFactory = createFactory(FIXTURE_MEMBER);
    expect(typeof memberFactory).toBe("function");
  });

  it("produces a factory that produces a new instance of it's fixture", () => {
    const memberFactory = createFactory(FIXTURE_MEMBER);
    const instance = memberFactory();
    expect(instance.nickname).toBe(FIXTURE_MEMBER.nickname);
    expect(instance.realName).toBe(FIXTURE_MEMBER.realName);
    expect(instance).not.toBe(FIXTURE_MEMBER);
  });

  it("allows partially overriding values", () => {
    const memberFactory = createFactory(FIXTURE_MEMBER);
    const instance = memberFactory({ realName: "Melanie Chisholm" });
    expect(instance.nickname).toBe(FIXTURE_MEMBER.nickname);
    expect(instance.realName).toBe("Melanie Chisholm");
  });

  it("returns .batch() as nested function", () => {
    const memberFactory = createFactory(FIXTURE_MEMBER);
    expect(typeof memberFactory.batch).toBe("function");
  });

  it("produces a factory batch that produces multiple new instance of it's fixture", () => {
    const memberFactory = createFactory(FIXTURE_MEMBER);
    const instance = memberFactory.batch(2);
    expect(instance[0].nickname).toBe(FIXTURE_MEMBER.nickname);
    expect(instance[0]).not.toBe(FIXTURE_MEMBER);
    expect(instance[1].realName).toBe(FIXTURE_MEMBER.realName);
    expect(instance[1]).not.toBe(FIXTURE_MEMBER);
  });

  it("allows partially overriding values", () => {
    const memberFactory = createFactory(FIXTURE_MEMBER);
    const [sporty] = memberFactory.batch(1, { realName: "Melanie Chisholm" });
    expect(sporty.nickname).toBe(FIXTURE_MEMBER.nickname);
    expect(sporty.realName).toBe("Melanie Chisholm");
  });

  it("allows partially overriding indexed values", () => {
    const memberFactory = createFactory(FIXTURE_MEMBER);
    const [ginger, scary, sporty, baby, posh] = memberFactory.batch(5, [
      { nickname: "ginger", realName: "Geri Halliwell" },
      { nickname: "scary", realName: "Melanie Brown" },
      { nickname: "sporty", realName: "Melanie Chisholm" },
      { nickname: "baby", realName: "Emma Bunton" },
      { nickname: "posh", realName: "Victoria Beckham" },
    ]);

    expect(ginger.realName).toBe("Geri Halliwell");
    expect(scary.realName).toBe("Melanie Brown");
    expect(sporty.realName).toBe("Melanie Chisholm");
    expect(baby.realName).toBe("Emma Bunton");
    expect(posh.realName).toBe("Victoria Beckham");
  });
});
