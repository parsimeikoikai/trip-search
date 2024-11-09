import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  keyword: string;
  includeCanceled: boolean;
  distance?: number;
  time?: string;
}

const initialState: SearchState = {
  keyword: '',
  includeCanceled: false,
  distance: 5, // Default to "Any"
  time: 'any',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams(state, action: PayloadAction<SearchState>) {
      return { ...state, ...action.payload };
    },
    resetSearchParams() {
      return initialState;
    },
  },
});

export const { setSearchParams, resetSearchParams } = searchSlice.actions;
export default searchSlice.reducer;
