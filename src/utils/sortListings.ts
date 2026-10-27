import type { Listing, SortOption } from '../types/listing';

export const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
];

/**
 * Pure function: returns a NEW sorted array. Array.prototype.sort() sorts in place,
 * so we copy first; otherwise we'd mutate React state.
 */
export function sortListings(listings: Listing[], sort: SortOption): Listing[] {
  const sorted = [...listings];

  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      // ISO dates (YYYY-MM-DD) compare correctly as plain strings
      return sorted.sort((a, b) => b.listedOn.localeCompare(a.listedOn));
  }
}
