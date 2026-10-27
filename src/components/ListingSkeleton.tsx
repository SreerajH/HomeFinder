import { Box, Card, CardActions, CardContent, Skeleton, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { GRID_ITEM_SIZE } from './ListingGrid';

function SkeletonCard() {
  return (
    <Card data-testid="listing-skeleton" sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" sx={{ aspectRatio: '4 / 3', height: 'auto' }} />
      <CardContent>
        <Skeleton width="45%" height={32} />
        <Skeleton width="85%" />
        <Skeleton width="55%" sx={{ mb: 2 }} />
        <Stack direction="row" spacing={2}>
          <Skeleton width={60} />
          <Skeleton width={60} />
          <Skeleton width={80} />
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Skeleton variant="rounded" width="100%" height={36} />
      </CardActions>
    </Card>
  );
}

/** Placeholder cards with the same shape and grid as the real ones, so nothing jumps when data arrives */
export default function ListingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <Box role="status" aria-label="Loading listings" aria-busy="true">
      <Grid container spacing={3}>
        {Array.from({ length: count }, (_, index) => (
          <Grid key={index} size={GRID_ITEM_SIZE}>
            <SkeletonCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
