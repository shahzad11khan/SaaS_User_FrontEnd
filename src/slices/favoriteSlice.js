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
    removeOneItemCount: (state, action) => {
      state.count -= action.payload;
    },
  },
});

export const {
  addFavourite,
  removeFavourite,
  setFavouriteCount,
  resetFavouriteCount,
  removeOneItemCount,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;