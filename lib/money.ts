export function formatARS(amount: number): string {
  const digits = Math.round(amount).toString();
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$ ${grouped}`;
}
