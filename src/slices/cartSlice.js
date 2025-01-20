
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { count: 0 },
  reducers: {
    addCart: (state) => {
      state.count += 1;
    },
    removeCart: (state) => {
      state.count -= 1;
    },
    setCartCount: (state, action) => {
      state.count = action.payload;
    },
    resetCartCount: (state) => {
      state.count = 0;
    },
    removeOneItemCount: (state, action) => {
      state.count -= action.payload;
    },
    addOneItemCount: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const {
  addCart,
  removeCart,
  setCartCount,
  resetCartCount,
  removeOneItemCount,
  addOneItemCount,
} = cartSlice.actions;

export default cartSlice.reducer;
