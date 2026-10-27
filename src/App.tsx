import { useMemo, useState } from 'react';
import { Box, Container, CssBaseline, Typography, useMediaQuery } from '@mui/material';
import { ThemeProvider, type PaletteMode } from '@mui/material/styles';
import { createAppTheme } from './theme';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ListingGrid from './components/ListingGrid';
import ListingSkeleton from './components/ListingSkeleton';
import ListingDetailsDialog from './components/ListingDetailsDialog';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';
import { useListings } from './hooks/useListings';
import { DEFAULT_FILTERS, filterListings, getPriceBounds } from './utils/filterListings';
import type { Listing, ListingFilters } from './types/listing';

export default function App() {
  // Start from the OS preference; once the user clicks the toggle their choice wins
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
  const [chosenMode, setChosenMode] = useState<PaletteMode | null>(null);
  const mode: PaletteMode = chosenMode ?? (prefersDark ? 'dark' : 'light');
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  // 1. Data: the custom hook owns fetching and request state
  const { listings, loading, error, refetch } = useListings();

  // 2. UI state: what the user has typed/selected
  const [filters, setFilters] = useState<ListingFilters>(DEFAULT_FILTERS);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // 3. Derived data: recalculated only when its inputs change
  const priceBounds = useMemo(() => getPriceBounds(listings), [listings]);
  const visibleListings = useMemo(() => filterListings(listings, filters), [listings, filters]);

  const updateFilters = (changes: Partial<ListingFilters>) => setFilters((prev) => ({ ...prev, ...changes }));
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const openDetails = (listing: Listing) => {
    setSelectedListing(listing);
    setDialogOpen(true);
  };

  const renderResults = () => {
    if (loading) return <ListingSkeleton />;
    if (error) return <ErrorState message={error} onRetry={refetch} />;
    if (visibleListings.length === 0) return <EmptyState onReset={resetFilters} />;
    return <ListingGrid listings={visibleListings} onViewDetails={openDetails} />;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header mode={mode} onToggleMode={() => setChosenMode(mode === 'light' ? 'dark' : 'light')} />

      <Container component="main" maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
            Find a home you'll love
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Apartments, villas and plots across Bangalore, Pune, Hyderabad, Chennai and Mumbai.
          </Typography>
        </Box>

        <FilterBar
          filters={filters}
          priceBounds={priceBounds}
          disabled={loading || Boolean(error)}
          onChange={updateFilters}
          onReset={resetFilters}
        />

        {!loading && !error && (
          <Typography variant="body2" color="text.secondary" aria-live="polite" sx={{ mb: 2 }}>
            Showing <strong>{visibleListings.length}</strong> of {listings.length} homes
          </Typography>
        )}

        {renderResults()}
      </Container>

      <ListingDetailsDialog listing={selectedListing} open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </ThemeProvider>
  );
}
