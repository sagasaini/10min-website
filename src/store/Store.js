import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';
import modalReducer from './modal';
import uiReducer from './ui';

// Create the Redux store with the given reducers
const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    modal: modalReducer,
  },
});

// Export the store as the default export
export default store;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;