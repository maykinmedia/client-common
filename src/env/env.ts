/**
 * Retrieves the value of an environment variable from either Node.js or Vite
 * environment.
 *
 * This function combines the environment variables from `process.env` (Node.js)
 * and `import.meta.env` (Vite) and returns the value of the specified variable.
 *
 * @param name - The name of the environment variable to retrieve.
 * @param defaultValue - The default value.
 * @returns The value of the environment variable or the default value.
 */
export function envGet<T = undefined>(
  name: string,
  defaultValue?: T,
): string | T {
  // For node (or webpack) environments.
  let nodeEnv;
  try {
    nodeEnv = process.env;
  } catch {
    // process.env is not defined.
  }

  // For vite environments
  let viteEnv;
  try {
    viteEnv = import.meta.env;
  } catch {
    // import.meta.env is not defined.
  }

  const env = { ...nodeEnv, ...viteEnv };
  const rawEnvValue = env[name];
  return typeof rawEnvValue === "undefined" ? defaultValue : rawEnvValue;
}

/**
 * Retrieves the value of an environment variable and converts it to a typed value.
 *
 * This function uses `envGet` to fetch the raw value and then converts it to an
 * appropriate JavaScript type. Supports conversion to:
 *
 * - boolean (`'true'` → `true`, `'false'` → `false`)
 * - yes/no (`'yes'` → `true`, `'no'` → `false`)
 * - number (`'123'` → `123`)
 *
 * Returns the `defaultValue` if the variable is not set.
 *
 * @param name - Name of the environment variable to retrieve.
 * @param defaultValue - Fallback value if the environment variable is not found.
 * @returns The converted typed value of the environment variable or the default value.
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
 * @param name - The name of the environment variable to compare.
 * @param value - The value to compare the environment variable to.
 * @param loose - If `true`, the comparison will be loose (values are converted
 *                to types). If `false`, the comparison will be strict (raw
 *                string values are compared).
 * @returns `true` if the comparison is successful, otherwise `false`.
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
 * to their proper types. It supports boolean conversions (`true`/`false`) and
 * numeric conversions (e.g., `"123"` to `123`).
 *
 * @param value - The string value to convert.
 * @returns The converted typed value.
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
