/**
 * Deterministic date formatter to prevent Next.js SSR hydration mismatches
 * between Node.js server locale and client browser locale.
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  
  // Deterministic DD/MM/YYYY format
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const year = d.getUTCFullYear();
  
  return `${day}/${month}/${year}`;
}
