import type { Listing } from '../types/listing';

/**
 * Our "REST endpoint". It is a static JSON file in /public, but the app treats it
 * exactly like a real API: fetch() it, check the status, parse the JSON.
 * Swapping in a real backend later only means changing this URL.
 */
export const LISTINGS_URL = '/data/listings.json';

export async function fetchListings(signal?: AbortSignal): Promise<Listing[]> {
  const response = await fetch(LISTINGS_URL, { signal });

  // fetch() only rejects on network failure, so HTTP errors (404, 500) must be checked by hand
  if (!response.ok) {
    throw new Error(`Failed to load listings (HTTP ${response.status})`);
  }

  return (await response.json()) as Listing[];
}
