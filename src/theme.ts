import { alpha, createTheme, type PaletteMode } from '@mui/material/styles';

const PRIMARY = '#0F766E'; // deep teal
const PRIMARY_LIGHT = '#2DD4BF'; // brighter teal for dark mode contrast

/**
 * Builds the app theme for a given mode. Shared tokens (shape, type, spacing)
 * live here once; only the palette changes between light and dark.
 */
export function createAppTheme(mode: PaletteMode) {
  const isLight = mode === 'light';
  const primary = isLight ? PRIMARY : PRIMARY_LIGHT;

  return createTheme({
    palette: {
      mode,
      primary: { main: primary, contrastText: isLight ? '#FFFFFF' : '#042F2E' },
      secondary: { main: isLight ? '#B45309' : '#FBBF24' },
      background: isLight
        ? { default: '#F6F7F9', paper: '#FFFFFF' }
        : { default: '#0B1215', paper: '#121B1F' },
      text: isLight
        ? { primary: '#111827', secondary: '#5B6472' }
        : { primary: '#E8ECEF', secondary: '#9AA5AE' },
      divider: isLight ? '#E5E7EB' : '#22303A',
    },
    shape: { borderRadius: 12 },
    spacing: 8,
    typography: {
      fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      h1: { fontWeight: 700, letterSpacing: '-0.02em' },
      h4: { fontWeight: 700, letterSpacing: '-0.02em' },
      h5: { fontWeight: 700, letterSpacing: '-0.01em' },
      h6: { fontWeight: 600, letterSpacing: '-0.01em' },
      subtitle1: { fontWeight: 600 },
      button: { fontWeight: 600, textTransform: 'none' },
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { borderRadius: 10, paddingInline: 16 } },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: ({ theme }) => ({
            border: `1px solid ${theme.palette.divider}`,
            transition: 'box-shadow 200ms ease, transform 200ms ease',
          }),
        },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiChip: {
        styleOverrides: { root: { fontWeight: 600 } },
      },
      // Visible keyboard focus everywhere: a clear ring only for keyboard users
      MuiButtonBase: {
        styleOverrides: {
          root: ({ theme }) => ({
            '&.Mui-focusVisible': {
              outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
              outlineOffset: 2,
            },
          }),
        },
      },
      MuiSlider: {
        styleOverrides: {
          thumb: ({ theme }) => ({
            '&.Mui-focusVisible': {
              boxShadow: `0 0 0 6px ${alpha(theme.palette.primary.main, 0.3)}`,
            },
          }),
        },
      },
    },
  });
}
