type AttemptResult<T> =
  | [value: T, error: undefined]
  | [value: undefined, error: NonNullable<unknown>];

export async function attempt<T>(
  fn: () => Promise<T>
): Promise<AttemptResult<T>> {
  try {
    const value = await fn();
    return [value, undefined];
  } catch (e) {
    return [undefined, e ?? new NullishError()];
  }
}

export class NullishError extends Error {
  override name = "NullishError";
}
