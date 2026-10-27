// en-IN groups digits the Indian way: 75,00,000 rather than 7,500,000
const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** 7500000 -> "₹75,00,000" */
export function formatPrice(amount: number): string {
  return inrFormatter.format(amount);
}

/** Short form for tight spaces like slider labels: 7500000 -> "₹75 L", 12500000 -> "₹1.25 Cr" */
export function formatPriceShort(amount: number): string {
  const CRORE = 10_000_000;
  const LAKH = 100_000;
  const trim = (n: number) => Number(n.toFixed(2)).toString();

  if (amount >= CRORE) return `₹${trim(amount / CRORE)} Cr`;
  if (amount >= LAKH) return `₹${trim(amount / LAKH)} L`;
  return formatPrice(amount);
}

/** 1650 -> "1,650" */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-IN');
}
