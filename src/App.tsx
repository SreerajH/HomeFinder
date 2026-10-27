import { useMemo, useState } from 'react';
import { Box, Container, CssBaseline, Typography, useMediaQuery } from '@mui/material';
import { ThemeProvider, type PaletteMode } from '@mui/material/styles';
import { createAppTheme } from './theme';
import Header from './components/Header';
import ListingGrid from './components/ListingGrid';
import { useListings } from './hooks/useListings';

export default function App() {
  // Start from the OS preference; once the user clicks the toggle their choice wins
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
  const [chosenMode, setChosenMode] = useState<PaletteMode | null>(null);
  const mode: PaletteMode = chosenMode ?? (prefersDark ? 'dark' : 'light');
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const { listings, loading, error } = useListings();

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

        {loading && <Typography>Loading…</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && <ListingGrid listings={listings} onViewDetails={() => {}} />}
      </Container>
    </ThemeProvider>
  );
}
