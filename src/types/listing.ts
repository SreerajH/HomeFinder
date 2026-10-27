export type PropertyType = 'Apartment' | 'Villa' | 'Plot';

/** Shape of one item in /public/data/listings.json */
export interface Listing {
  id: string;
  title: string;
  city: string;
  locality: string;
  type: PropertyType;
  /** Price in rupees, e.g. 7500000 = ₹75 lakh */
  price: number;
  /** null for plots, which have no built-up rooms */
  bedrooms: number | null;
  bathrooms: number | null;
  areaSqFt: number;
  imageUrl: string;
  description: string;
}

/** Everything the filter bar controls, kept in one object so it can be reset in one go */
export interface ListingFilters {
  search: string;
  type: PropertyType | 'All';
  priceRange: [number, number];
}
