import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filtersSlice';
import savedReducer from './savedSlice';
import { loadSavedIds, saveSavedIds } from './persistSaved';

// The store's shape: { filters: ListingFilters, saved: { ids: string[] } }
const rootReducer = combineReducers({
  filters: filtersReducer,
  saved: savedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

/** Plain store factory. Tests call this to get a fresh, isolated store each time. */
export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({ reducer: rootReducer, preloadedState });
}

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

/**
 * The store the app actually uses: starts with saved ids from localStorage and
 * writes them back whenever they change.
 */
export function createAppStore(): AppStore {
  const store = setupStore({ saved: { ids: loadSavedIds() } });

  let lastSavedIds = store.getState().saved.ids;
  store.subscribe(() => {
    const { ids } = store.getState().saved;
    // Immer only creates a new array when it really changed, so a reference check is enough
    if (ids !== lastSavedIds) {
      lastSavedIds = ids;
      saveSavedIds(ids);
    }
  });

  return store;
}
