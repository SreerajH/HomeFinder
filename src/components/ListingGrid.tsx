import Grid from '@mui/material/Grid2';
import type { Listing } from '../types/listing';
import ListingCard from './ListingCard';

interface ListingGridProps {
  listings: Listing[];
  onViewDetails: (listing: Listing) => void;
}

/** 1 column on mobile (xs), 2 on tablet (sm), 3 on desktop (md and up) */
export const GRID_ITEM_SIZE = { xs: 12, sm: 6, md: 4 } as const;

export default function ListingGrid({ listings, onViewDetails }: ListingGridProps) {
  return (
    <Grid container spacing={3} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
      {listings.map((listing) => (
        <Grid key={listing.id} size={GRID_ITEM_SIZE} component="li">
          <ListingCard listing={listing} onViewDetails={onViewDetails} />
        </Grid>
      ))}
    </Grid>
  );
}
