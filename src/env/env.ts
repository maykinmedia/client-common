/**
 * Retrieves the value of an environment variable from either Node.js or Vite environment.
 *
 * This function combines the environment variables from `process.env` (Node.js)
 * and `import.meta.env` (Vite) and returns the value of the specified variable.
 *
 * @param {string} name - The name of the environment variable to retrieve.
 * @param defaultValue - The default value.
 */
export function envGet<T = undefined>(
  name: string,
  defaultValue?: T,
): string | T {
  const nodeEnv = process.env;
  const viteEnv = import.meta.env;
  const env = { ...nodeEnv, ...viteEnv };
  const rawEnvValue = env[name];
  return typeof rawEnvValue === "undefined" ? defaultValue : rawEnvValue;
}

/**
 * Retrieves and converts the value of an environment variable to its typed value.
 *
 * This function first calls `envGet` to get the raw environment variable value,
 * and then converts it into a more appropriate type (e.g., `true`/`false` for boolean
 * values). See value2TypedValue (private) for more information.
 *
 * @param {string} name - The name of the environment variable to retrieve and convert.
 * @param defaultValue - The default value.
 */
export function typedEnvGet<T = undefined>(
  name: string,
  defaultValue?: T,
): boolean | number | string | T {
  const rawEnvValue = envGet(name);
  return typeof rawEnvValue === "undefined"
    ? (defaultValue as T)
    : value2TypedValue(rawEnvValue);
}

/**
 * Compares the value of an environment variable to a specified value.
 *
 * This function compares the environment variable to the provided value.
 * It can perform a loose comparison (converting values to their typed form) or
 * strict comparison (comparing raw values as strings). If no env value is found,
 * `false` is returned.
 *
 * @param {string} name - The name of the environment variable to compare.
 * @param {unknown} value - The value to compare the environment variable to.
 * @param {boolean} [loose=true] - If `true`, the comparison will be loose (values
 *                                  are converted to types).
 *                                 If `false`, the comparison will be strict (raw
 *                                  string values are compared).
 */
export function envCompare(name: string, value: unknown, loose = true) {
  const envValue = envGet(name);
  if (envValue === undefined) {
    return false;
  }

  if (loose) {
    const typedEnvValue = typedEnvGet(name);
    const typedValue = value2TypedValue(String(value));
    return typedValue === typedEnvValue;
  }
  return value === envValue;
}

/**
 * Converts a string value to its appropriate typed value (e.g., `true`/`false`
 * for boolean, or a number).
 *
 * This private function is used internally to convert environment variable values
 * to their proper types.
 * It supports boolean conversions (`true`/`false`) and numeric conversions (e.g.,
 * `"123"` to `123`).
 *
 * @param {string} value - The string value to convert.
 * @private
 */
function value2TypedValue<T>(value: T): T | boolean | number {
  const strValue = String(value).toLowerCase();

  // Normalize yes/no and true/false.
  switch (strValue) {
    case "true":
    case "yes":
      return true;
    case "no":
    case "false":
      return false;
  }

  // Try to convert to a number, if possible
  const numValue = Number(value);
  return isNaN(numValue) ? value : numValue;
}
