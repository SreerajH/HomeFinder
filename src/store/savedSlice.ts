import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

export interface SavedState {
  /** Ids of saved listings, most recently saved first */
  ids: string[];
}

const initialState: SavedState = { ids: [] };

const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    saveListing(state, action: PayloadAction<string>) {
      if (!state.ids.includes(action.payload)) state.ids.unshift(action.payload);
    },
    unsaveListing(state, action: PayloadAction<string>) {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});

export const { saveListing, unsaveListing } = savedSlice.actions;
export default savedSlice.reducer;

export const selectSavedIds = (state: RootState) => state.saved.ids;
export const selectSavedCount = (state: RootState) => state.saved.ids.length;
export const selectIsSaved = (state: RootState, id: string) => state.saved.ids.includes(id);
