import { testListings } from '../test/fixtures';
import { DEFAULT_FILTERS, filterListings, getPriceBounds } from './filterListings';

// Helper: run the filter and return just the ids, which makes assertions easy to read
const ids = (filters: Partial<typeof DEFAULT_FILTERS>) =>
  filterListings(testListings, { ...DEFAULT_FILTERS, ...filters }).map((listing) => listing.id);

describe('filterListings', () => {
  it('returns every listing when no filters are set', () => {
    expect(ids({})).toEqual(['t-1', 't-2', 't-3']);
  });

  describe('search text', () => {
    it('matches the title, ignoring case', () => {
      expect(ids({ search: 'VILLA' })).toEqual(['t-2']);
    });

    it('matches the city', () => {
      expect(ids({ search: 'hyderabad' })).toEqual(['t-3']);
    });

    it('ignores surrounding whitespace', () => {
      expect(ids({ search: '  pune  ' })).toEqual(['t-2']);
    });

    it('returns nothing when there is no match', () => {
      expect(ids({ search: 'atlantis' })).toEqual([]);
    });
  });

  describe('property type', () => {
    it('keeps only listings of the selected type', () => {
      expect(ids({ type: 'Apartment' })).toEqual(['t-1']);
      expect(ids({ type: 'Plot' })).toEqual(['t-3']);
    });
  });

  describe('price range', () => {
    it('keeps listings inside the range', () => {
      expect(ids({ priceRange: [5_000_000, 10_000_000] })).toEqual(['t-1']);
    });

    it('includes listings priced exactly at the min or max', () => {
      expect(ids({ priceRange: [4_000_000, 9_000_000] })).toEqual(['t-1', 't-3']);
    });
  });

  it('combines all filters (AND, not OR)', () => {
    expect(ids({ search: 'pune', type: 'Apartment' })).toEqual([]);
    expect(ids({ search: 'a', type: 'Villa', priceRange: [20_000_000, 40_000_000] })).toEqual(['t-2']);
  });

  it('does not modify the original array', () => {
    const before = [...testListings];
    filterListings(testListings, { ...DEFAULT_FILTERS, type: 'Villa' });
    expect(testListings).toEqual(before);
  });
});

describe('getPriceBounds', () => {
  it('returns the cheapest and most expensive price', () => {
    expect(getPriceBounds(testListings)).toEqual([4_000_000, 30_000_000]);
  });

  it('returns [0, 0] for an empty list', () => {
    expect(getPriceBounds([])).toEqual([0, 0]);
  });
});
