export function formatGrouped(amount: number): string {
  return Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatARS(amount: number): string {
  return `$ ${formatGrouped(amount)}`;
}
