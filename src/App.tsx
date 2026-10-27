import { useMemo } from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from './theme';

export default function App() {
  const theme = useMemo(() => createAppTheme('light'), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" component="h1">
          HomeFinder
        </Typography>
        <Typography color="text.secondary">Project setup complete.</Typography>
      </Container>
    </ThemeProvider>
  );
}
