import { useCallback, useEffect, useState } from 'react';
import { fetchListings } from '../services/listingsApi';
import type { Listing } from '../types/listing';

interface UseListingsResult {
  listings: Listing[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Loads listings from the API and tracks the three request states
 * (loading / success / error) so components don't have to.
 */
export function useListings(): UseListingsResult {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Bumping this number re-runs the effect below, which is how refetch works
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    // Lets us cancel the request if the component unmounts or a newer request starts
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetchListings(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setListings(data);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Something went wrong');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [requestId]);

  const refetch = useCallback(() => setRequestId((id) => id + 1), []);

  return { listings, loading, error, refetch };
}
