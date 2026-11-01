import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ListingFilters } from '../types/listing';
import { DEFAULT_FILTERS } from '../utils/filterListings';
import type { RootState } from './index';

/**
 * A "slice" = one piece of the global state + the reducers that change it.
 * createSlice also generates an action creator for every reducer below.
 */
const filtersSlice = createSlice({
  name: 'filters',
  initialState: DEFAULT_FILTERS,
  reducers: {
    // Redux Toolkit uses Immer, so these "mutations" actually produce a new state object
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setType(state, action: PayloadAction<ListingFilters['type']>) {
      state.type = action.payload;
    },
    setPriceRange(state, action: PayloadAction<[number, number] | null>) {
      state.priceRange = action.payload;
    },
    resetFilters() {
      return DEFAULT_FILTERS;
    },
  },
});

export const { setSearch, setType, setPriceRange, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;

// Selectors: small functions that read a value out of the whole store state
export const selectFilters = (state: RootState) => state.filters;
