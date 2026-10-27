import type { Listing, ListingFilters } from '../types/listing';

export const DEFAULT_FILTERS: ListingFilters = {
  search: '',
  type: 'All',
  priceRange: null,
};

/**
 * Pure function: same input always gives the same output and nothing outside is changed.
 * That makes it trivial to unit test and safe to wrap in useMemo.
 */
export function filterListings(listings: Listing[], filters: ListingFilters): Listing[] {
  const query = filters.search.trim().toLowerCase();

  return listings.filter((listing) => {
    const matchesSearch =
      query === '' ||
      listing.title.toLowerCase().includes(query) ||
      listing.city.toLowerCase().includes(query);

    const matchesType = filters.type === 'All' || listing.type === filters.type;

    const matchesPrice =
      filters.priceRange === null ||
      (listing.price >= filters.priceRange[0] && listing.price <= filters.priceRange[1]);

    return matchesSearch && matchesType && matchesPrice;
  });
}

/** Cheapest and most expensive price in the data, used as the slider's min and max */
export function getPriceBounds(listings: Listing[]): [number, number] {
  if (listings.length === 0) return [0, 0];
  const prices = listings.map((listing) => listing.price);
  return [Math.min(...prices), Math.max(...prices)];
}

export function hasActiveFilters(filters: ListingFilters): boolean {
  return filters.search.trim() !== '' || filters.type !== 'All' || filters.priceRange !== null;
}
