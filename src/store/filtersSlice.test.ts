import filtersReducer, { resetFilters, setPriceRange, setSearch, setType } from './filtersSlice';
import { DEFAULT_FILTERS } from '../utils/filterListings';

describe('filtersSlice reducer', () => {
  it('updates each filter from its action, and resetFilters restores the defaults', () => {
    // A reducer is a pure function: (currentState, action) => newState. No React or store needed.
    let state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(DEFAULT_FILTERS);

    state = filtersReducer(state, setSearch('pune'));
    state = filtersReducer(state, setType('Villa'));
    state = filtersReducer(state, setPriceRange([5_000_000, 20_000_000]));
    expect(state).toEqual({ search: 'pune', type: 'Villa', priceRange: [5_000_000, 20_000_000] });

    // The action creators build plain objects like { type: 'filters/setSearch', payload: 'pune' }
    expect(setSearch('pune')).toEqual({ type: 'filters/setSearch', payload: 'pune' });

    expect(filtersReducer(state, resetFilters())).toEqual(DEFAULT_FILTERS);
  });
});
