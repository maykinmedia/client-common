/**
 * Retrieves the current environment mode.
 */
export function getBuildMode(): string | undefined {
  return process.env.NODE_ENV; // Should work on Vite as well.
}

/**
 * Determines if the current build is a development build.
 */
export function isDevelopmentBuild(): boolean {
  return getBuildMode() === "development";
}

/**
 * Determines if the current build is a production build.
 */
export function isProductionBuild(): boolean {
  return getBuildMode() === "production";
}
