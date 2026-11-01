import { useMemo, useState } from 'react';
import { Box, Container, CssBaseline, Stack, Typography, useMediaQuery } from '@mui/material';
import { ThemeProvider, type PaletteMode } from '@mui/material/styles';
import { createAppTheme } from './theme';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ListingGrid from './components/ListingGrid';
import ListingSkeleton from './components/ListingSkeleton';
import ListingDetailsDialog from './components/ListingDetailsDialog';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';
import SortSelect from './components/SortSelect';
import { useListings } from './hooks/useListings';
import { filterListings, getPriceBounds } from './utils/filterListings';
import { sortListings } from './utils/sortListings';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { resetFilters, selectFilters } from './store/filtersSlice';
import type { Listing, SortOption } from './types/listing';

export default function App() {
  // Start from the OS preference; once the user clicks the toggle their choice wins
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
  const [chosenMode, setChosenMode] = useState<PaletteMode | null>(null);
  const mode: PaletteMode = chosenMode ?? (prefersDark ? 'dark' : 'light');
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  // 1. Data: the custom hook owns fetching and request state
  const { listings, loading, error, refetch } = useListings();

  // 2. Shared state lives in Redux (filters, saved listings); purely local UI state stays in useState
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();
  const [sort, setSort] = useState<SortOption>('newest');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // 3. Derived data: recalculated only when its inputs change
  const priceBounds = useMemo(() => getPriceBounds(listings), [listings]);
  const visibleListings = useMemo(
    () => sortListings(filterListings(listings, filters), sort),
    [listings, filters, sort],
  );

  const openDetails = (listing: Listing) => {
    setSelectedListing(listing);
    setDialogOpen(true);
  };

  const renderResults = () => {
    if (loading) return <ListingSkeleton />;
    if (error) return <ErrorState message={error} onRetry={refetch} />;
    if (visibleListings.length === 0) return <EmptyState onReset={() => dispatch(resetFilters())} />;
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

        <FilterBar priceBounds={priceBounds} disabled={loading || Boolean(error)} />

        {!loading && !error && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'stretch', sm: 'center' }}
            spacing={1.5}
            sx={{ mb: 2.5 }}
          >
            <Typography variant="body2" color="text.secondary" aria-live="polite">
              Showing <strong>{visibleListings.length}</strong> of {listings.length} homes
            </Typography>
            <SortSelect value={sort} onChange={setSort} disabled={visibleListings.length < 2} />
          </Stack>
        )}

        {renderResults()}
      </Container>

      <ListingDetailsDialog listing={selectedListing} open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </ThemeProvider>
  );
}
