type Factory<T extends object> = FactoryFnSingle<T> & {
  batch: FactoryFnBatch<T>;
};

type FactoryFnSingle<T extends object> = (values?: Partial<T>) => T;

type FactoryFnBatch<T extends object> = (
  amount: number,
  values?: Partial<T> | Partial<T>[],
) => T[];

/**
 * Creates a factory that produces fresh copies of `fixture`, with optional overrides,
 * for building test data of type `T` one at a time or in batches.
 *
 * @typeParam T - Type of instances to produce.
 * @param fixture - The base fixture used for every object the produced factory creates.
 * @returns A function that takes optional `values` and assigns them to a clone of `fixture`
 * before returning it. The function also has a `batch` method that creates `amount` objects
 * at once, applying either a single `values` object to all of them or an array of `values`,
 * one per object.
 *
 * @example
 * ```ts
 * const FIXTURE_MEMBER = { nickname: "sporty", realName: "Melanie Coloma" };
 * const memberFactory = createFactory(FIXTURE_MEMBER);
 *
 * const member = memberFactory();
 * // { nickname: "sporty", realName: "Melanie Coloma" }
 *
 * const renamed = memberFactory({ realName: "Melanie Chisholm" });
 * // { nickname: "sporty", realName: "Melanie Chisholm" }
 *
 * const members = memberFactory.batch(2, { realName: "Melanie Chisholm" });
 * // two members, each with realName "Melanie Chisholm"
 *
 * const [ginger, scary] = memberFactory.batch(2, [
 *   { nickname: "ginger", realName: "Geri Halliwell" },
 *   { nickname: "scary", realName: "Melanie Brown" },
 * ]);
 * ```
 */
export function createFactory<T extends object>(fixture: T): Factory<T> {
  const factoryFnSingle: FactoryFnSingle<T> = (values?: Partial<T>) =>
    _baseFactory(fixture, values);

  const factoryFnBatch: FactoryFnBatch<T> = (
    amount: number,
    values?: Partial<T> | Partial<T>[],
  ) => _batchFactory(factoryFnSingle, amount, values);

  return Object.assign(factoryFnSingle, { batch: factoryFnBatch });
}

/**
 * The base factory function creates an instance of `<T>` with values assigns to it.
 * Takes `values` and assigns it to a cloned `fixture` before returning it.
 * Don't use this directly, use `const memberFactory = createFactory(FIXTURE_MEMBER)` instead.
 *
 * @typeParam T - Type of instances to produce.
 * @param fixture - The base fixture to return when calling the produced factory function.
 * @param values - A (subset of) `<T>` object with values to apply ot each instance.
 */
function _baseFactory<T extends object>(fixture: T, values?: Partial<T>): T {
  const clone = { ...fixture }; // Shallow clone for now.
  return Object.assign(clone, values || {});
}

/**
 * Creates `amount` instances of `<T>` using provided `factoryFn`.
 * Don't use this directly, use `memberFactory.batch(2, { realName: "Melanie Chisholm" })` instead.
 *
 * @typeParam T - Type of instances to produce.
 * @param factoryFn - A function that takes `values` and assigns it to a cloned `fixture` (supplied by
 * `createFactory`) before returning it.
 * @param amount - The number of instances to create.
 * @param values - A (subset of) `<T>` object with values to apply to each instance.
 */
function _batchFactory<T extends object>(
  factoryFn: FactoryFnSingle<T>,
  amount: number,
  values?: Partial<T> | Partial<T>[],
): T[] {
  const valuesArray = Array.from({
    ...(Array.isArray(values) ? values : []),
    length: amount,
  });
  return valuesArray.map((_values) => factoryFn(_values || values));
}
