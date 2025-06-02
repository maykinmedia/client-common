import { isDevelopmentBuild } from "../env";
import { stripEnd } from "../format";

/**
 * Logs a deprecation warning or throws an error if the condition is truthy.
 *
 * @param condition - If true, a deprecation warning is triggered.
 * @param name - The name of the deprecated symbol.
 * @param alternative - Explanation of the migration path.
 * @param removedInVersion - Optional version string indicating when this will be removed.
 */
export function deprecated(
  condition: boolean,
  name: string,
  alternative?: string,
  removedInVersion?: string,
): void {
  if (!condition) {
    return;
  }

  const versionSuffix = removedInVersion
    ? ` (will be removed in version ${removedInVersion})`
    : "";
  const alternativeSuffix = alternative ? ` ${alternative}` : "";
  const finalMessage =
    stripEnd(`${name}${versionSuffix}.${alternativeSuffix}.`, ".") + ".";
  throwOrWarn("DEPRECATED", finalMessage, false, true);
}

/**
 * Throws an error or logs a warning if the given condition is falsy.
 *
 * @param condition - The condition to check.
 * @param message - Optional message string.
 * @throws Error When the condition is falsy and `throwError` is true.
 */
export function invariant(
  condition: unknown,
  message?: string,
): asserts condition {
  if (!condition) {
    throwOrWarn("INVARIANT", message ?? "Invariant violation", true);
  }
}

/**
 * Throws an error or logs a warning depending on `throwError`.
 *
 * @param type - The message type (e.g. "deprecated" or invariant").
 * @param message - The message to use in the error or warning.
 * @param throwError - Whether to throw an error. If false, logs a warning instead.
 * @param developmentOnly - Whether to only throw or warn in development builds.
 * @throws Error When `throwError` is true.
 */
function throwOrWarn(
  type: string,
  message: string,
  throwError: boolean,
  developmentOnly = false,
) {
  if (developmentOnly && !isDevelopmentBuild()) {
    return;
  }
  const formattedMessage = `${type.toUpperCase()}: ${message}`;
  if (throwError) {
    throw new Error(formattedMessage);
  }
  console.warn(formattedMessage);
}
