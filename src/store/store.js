import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from '../slices/favoriteSlice';
import cartReducer from '../slices/cartSlice';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import { addStateToLocalStorage, loadStateFromLocalStorage } from '../utils/localStorage';

const persistedState = loadStateFromLocalStorage();

const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
    cart: cartReducer,
    auth: authReducer,
    profile: profileReducer
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  addStateToLocalStorage(store.getState());
});

export default store;