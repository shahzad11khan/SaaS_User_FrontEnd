import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from '../slices/favoriteSlice';
import cartReducer from '../slices/cartSlice';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import productsSlice from '../slices/ProductsSlice';
import { addStateToLocalStorage, loadStateFromLocalStorage } from '../utils/localStorage';
import resetPasswordSlice from '../slices/resetPasswordSlice'

const persistedState = loadStateFromLocalStorage();

const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
    cart: cartReducer,
    auth: authReducer,
    profile: profileReducer,
    product : productsSlice,
    resetPassword: resetPasswordSlice,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  addStateToLocalStorage(store.getState());
});

export default store;