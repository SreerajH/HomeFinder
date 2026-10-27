import type { Listing } from '../types/listing';

/** Small, predictable data set for tests, independent of the real listings.json */
export const testListings: Listing[] = [
  {
    id: 't-1',
    title: 'Lakeview Apartment',
    city: 'Bangalore',
    locality: 'Hebbal',
    type: 'Apartment',
    price: 9_000_000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1100,
    imageUrl: 'https://picsum.photos/seed/test-1/800/600',
    description: 'A bright apartment overlooking Hebbal lake.',
  },
  {
    id: 't-2',
    title: 'Hilltop Villa',
    city: 'Pune',
    locality: 'Baner',
    type: 'Villa',
    price: 30_000_000,
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: 3000,
    imageUrl: 'https://picsum.photos/seed/test-2/800/600',
    description: 'A spacious villa with views across Baner hill.',
  },
  {
    id: 't-3',
    title: 'Corner Plot',
    city: 'Hyderabad',
    locality: 'Shamshabad',
    type: 'Plot',
    price: 4_000_000,
    bedrooms: null,
    bathrooms: null,
    areaSqFt: 2400,
    imageUrl: 'https://picsum.photos/seed/test-3/800/600',
    description: 'An approved corner plot near the airport.',
  },
];
