import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
import BedOutlined from '@mui/icons-material/BedOutlined';
import BathtubOutlined from '@mui/icons-material/BathtubOutlined';
import SquareFootOutlined from '@mui/icons-material/SquareFootOutlined';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import type { Listing } from '../types/listing';
import { formatNumber, formatPrice } from '../utils/formatPrice';

interface ListingCardProps {
  listing: Listing;
  onViewDetails: (listing: Listing) => void;
}

function Stat({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Stack direction="row" spacing={0.75} alignItems="center" sx={{ color: 'text.secondary' }}>
      {icon}
      <Typography variant="body2" component="span">
        {children}
      </Typography>
    </Stack>
  );
}

export default function ListingCard({ listing, onViewDetails }: ListingCardProps) {
  const { title, city, locality, type, price, bedrooms, bathrooms, areaSqFt, imageUrl } = listing;

  return (
    <Card
      component="article"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' },
        '@media (prefers-reduced-motion: reduce)': { '&:hover': { transform: 'none' } },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={title}
          loading="lazy"
          sx={{ aspectRatio: '4 / 3', objectFit: 'cover', bgcolor: 'action.hover' }}
        />
        <Chip
          label={type}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: 'background.paper',
            color: 'text.primary',
            boxShadow: 1,
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant="h6" component="p" color="primary" sx={{ mb: 0.5 }}>
          {formatPrice(price)}
        </Typography>
        <Typography variant="subtitle1" component="h3" sx={{ lineHeight: 1.3, mb: 0.5 }}>
          {title}
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary', mb: 2 }}>
          <PlaceOutlined sx={{ fontSize: 18 }} aria-hidden />
          <Typography variant="body2">
            {locality}, {city}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
          {bedrooms !== null && (
            <Stat icon={<BedOutlined sx={{ fontSize: 18 }} aria-hidden />}>
              {bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}
            </Stat>
          )}
          {bathrooms !== null && (
            <Stat icon={<BathtubOutlined sx={{ fontSize: 18 }} aria-hidden />}>
              {bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}
            </Stat>
          )}
          <Stat icon={<SquareFootOutlined sx={{ fontSize: 18 }} aria-hidden />}>
            {formatNumber(areaSqFt)} sq ft
          </Stat>
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => onViewDetails(listing)}
          aria-label={`View details for ${title}`}
        >
          View details
        </Button>
      </CardActions>
    </Card>
  );
}
