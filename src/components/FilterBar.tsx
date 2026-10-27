import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import SearchRounded from '@mui/icons-material/SearchRounded';
import RestartAltRounded from '@mui/icons-material/RestartAltRounded';
import type { ListingFilters, PropertyType } from '../types/listing';
import { formatPrice, formatPriceShort } from '../utils/formatPrice';
import { hasActiveFilters } from '../utils/filterListings';

const TYPE_OPTIONS: Array<PropertyType | 'All'> = ['All', 'Apartment', 'Villa', 'Plot'];
const PRICE_STEP = 100_000; // ₹1 lakh

interface FilterBarProps {
  filters: ListingFilters;
  priceBounds: [number, number];
  disabled?: boolean;
  onChange: (changes: Partial<ListingFilters>) => void;
  onReset: () => void;
}

export default function FilterBar({ filters, priceBounds, disabled = false, onChange, onReset }: FilterBarProps) {
  const [minPrice, maxPrice] = priceBounds;
  const priceValue = filters.priceRange ?? priceBounds;

  return (
    <Paper
      component="section"
      aria-label="Filter listings"
      variant="outlined"
      sx={{ p: { xs: 2, md: 2.5 }, mb: 3 }}
    >
      <Grid container spacing={2.5} alignItems="center">
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            label="Search"
            placeholder="Title or city"
            value={filters.search}
            onChange={(event) => onChange({ search: event.target.value })}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded aria-hidden />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
          <FormControl fullWidth>
            <InputLabel id="property-type-label">Property type</InputLabel>
            <Select
              labelId="property-type-label"
              id="property-type"
              label="Property type"
              value={filters.type}
              onChange={(event) => onChange({ type: event.target.value as ListingFilters['type'] })}
            >
              {TYPE_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 'grow' }}>
          <Box sx={{ px: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline">
              <Typography id="price-range-label" variant="body2" fontWeight={600}>
                Price range
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatPriceShort(priceValue[0])} – {formatPriceShort(priceValue[1])}
              </Typography>
            </Stack>
            <Slider
              aria-labelledby="price-range-label"
              value={priceValue}
              min={minPrice}
              max={maxPrice}
              step={PRICE_STEP}
              disabled={disabled || minPrice === maxPrice}
              onChange={(_event, value) => onChange({ priceRange: value as [number, number] })}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPriceShort}
              getAriaValueText={formatPrice}
              size="small"
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 'auto' }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<RestartAltRounded />}
            onClick={onReset}
            disabled={!hasActiveFilters(filters)}
            sx={{ height: { xs: 44, md: 56 }, whiteSpace: 'nowrap' }}
          >
            Reset filters
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
