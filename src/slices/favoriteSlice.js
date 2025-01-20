import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: { count: 0 },
  reducers: {
    addFavourite: (state) => {
      state.count += 1;
    },
    removeFavourite: (state) => {
      state.count -= 1;
    },
    setFavouriteCount: (state, action) => {
      state.count = action.payload;
    },
    resetFavouriteCount: (state) => {
      state.count = 0;
    },
  },
});

export const {
  addFavourite,
  removeFavourite,
  setFavouriteCount,
  resetFavouriteCount,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;