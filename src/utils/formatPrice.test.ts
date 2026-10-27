import { formatNumber, formatPrice, formatPriceShort } from './formatPrice';

describe('formatPrice', () => {
  it('formats 7500000 as ₹75,00,000 using Indian digit grouping', () => {
    expect(formatPrice(7_500_000)).toBe('₹75,00,000');
  });

  it('formats crore values with lakh/crore grouping', () => {
    expect(formatPrice(12_500_000)).toBe('₹1,25,00,000');
  });

  it('drops paise (no decimal places)', () => {
    expect(formatPrice(9_194.6)).toBe('₹9,195');
  });
});

describe('formatPriceShort', () => {
  it('uses lakhs below one crore and crores above', () => {
    expect(formatPriceShort(7_500_000)).toBe('₹75 L');
    expect(formatPriceShort(12_500_000)).toBe('₹1.25 Cr');
  });
});

describe('formatNumber', () => {
  it('adds Indian thousands separators', () => {
    expect(formatNumber(1650)).toBe('1,650');
  });
});
