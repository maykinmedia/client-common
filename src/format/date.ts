/**
 * Formats a `Date` into a string.
 *
 * @param date - The date to format.
 * @param format - The output format.
 *
 * Supported formats:
 * - `"iso"` (default) — `YYYY-MM-DD`
 * - `"nl"` — `DD/MM/YYYY`
 *
 * @returns The formatted date string.
 * @throws Error If an unsupported format is provided.
 */
export function formatDate(date: Date, format: "iso" | "nl" = "iso"): string {
  const fullYear = date.getFullYear();
  const month = date.getMonth() + 1;
  const fullMonth = month.toString().padStart(2, "0");
  const day = date.getDate();
  const fullDay = day.toString().padStart(2, "0");

  switch (format) {
    case "iso":
      return `${fullYear}-${fullMonth}-${fullDay}`;
    case "nl":
      return `${fullDay}/${fullMonth}/${fullYear}`;
    default:
      throw new Error(`Unknown date format format: ${format}`);
  }
}
