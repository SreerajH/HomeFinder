import { Box, Button, Paper, Typography } from '@mui/material';
import SearchOffRounded from '@mui/icons-material/SearchOffRounded';

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <Paper variant="outlined" sx={{ py: 8, px: 3, textAlign: 'center', borderStyle: 'dashed' }}>
      <Box
        aria-hidden
        sx={{
          display: 'inline-grid',
          placeItems: 'center',
          width: 64,
          height: 64,
          borderRadius: '50%',
          bgcolor: 'action.hover',
          color: 'text.secondary',
          mb: 2,
        }}
      >
        <SearchOffRounded fontSize="large" />
      </Box>
      <Typography variant="h6" component="h2" gutterBottom>
        No homes match your filters
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 380, mx: 'auto' }}>
        Try a different city, widen the price range, or clear everything to see all listings again.
      </Typography>
      <Button variant="contained" onClick={onReset}>
        Clear all filters
      </Button>
    </Paper>
  );
}
