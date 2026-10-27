import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import CloseRounded from '@mui/icons-material/CloseRounded';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import type { Listing } from '../types/listing';
import { formatNumber, formatPrice } from '../utils/formatPrice';

interface ListingDetailsDialogProps {
  listing: Listing | null;
  open: boolean;
  onClose: () => void;
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" component="dt">
        {label}
      </Typography>
      <Typography variant="subtitle1" component="dd" sx={{ m: 0 }}>
        {value}
      </Typography>
    </Box>
  );
}

export default function ListingDetailsDialog({ listing, open, onClose }: ListingDetailsDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // listing stays set while the dialog animates closed, so the content doesn't vanish mid-transition
  if (!listing) return null;

  const pricePerSqFt = Math.round(listing.price / listing.areaSqFt);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      aria-labelledby="listing-dialog-title"
      aria-describedby="listing-dialog-description"
    >
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={listing.imageUrl}
          alt={listing.title}
          sx={{ display: 'block', width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', bgcolor: 'action.hover' }}
        />
        <IconButton
          onClick={onClose}
          aria-label="Close details"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'background.paper' },
            boxShadow: 1,
          }}
        >
          <CloseRounded />
        </IconButton>
      </Box>

      <DialogTitle id="listing-dialog-title" sx={{ pb: 0.5 }}>
        <Chip label={listing.type} size="small" color="primary" variant="outlined" sx={{ mb: 1 }} />
        <Typography variant="h5" component="span" display="block">
          {listing.title}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary', mb: 2 }}>
          <PlaceOutlined sx={{ fontSize: 18 }} aria-hidden />
          <Typography variant="body2">
            {listing.locality}, {listing.city}
          </Typography>
        </Stack>

        <Typography variant="h4" component="p" color="primary" sx={{ mb: 2 }}>
          {formatPrice(listing.price)}
        </Typography>

        <Grid container spacing={2} component="dl" sx={{ m: 0, mb: 2 }}>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Fact label="Bedrooms" value={listing.bedrooms === null ? '—' : String(listing.bedrooms)} />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Fact label="Bathrooms" value={listing.bathrooms === null ? '—' : String(listing.bathrooms)} />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Fact label="Area" value={`${formatNumber(listing.areaSqFt)} sq ft`} />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Fact label="Price / sq ft" value={formatPrice(pricePerSqFt)} />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1" component="h3" gutterBottom>
          About this property
        </Typography>
        <Typography id="listing-dialog-description" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {listing.description}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
