/**
 * Gets the value of a cookie.
 *
 * @param name - The name of the cookie to retrieve.
 * @returns The cookie value if it exists, otherwise null.
 */
export function getCookie(name: string): string | null {
  const ca = document.cookie.split(";");
  for (let c of ca) {
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name + "=") === 0) {
      return c.substring(name.length + 1, c.length).trim();
    }
  }
  return null;
}
