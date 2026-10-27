import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SortOption } from '../types/listing';
import { SORT_OPTIONS } from '../utils/sortListings';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  disabled?: boolean;
}

export default function SortSelect({ value, onChange, disabled = false }: SortSelectProps) {
  return (
    <FormControl size="small" sx={{ minWidth: 200 }} disabled={disabled}>
      <InputLabel id="sort-by-label">Sort by</InputLabel>
      <Select
        labelId="sort-by-label"
        id="sort-by"
        label="Sort by"
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
