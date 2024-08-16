import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
  billAmount: 80,
  discount: 0,
  status: 'idle', 
  error: null,
};

// Thunk to fetch cart data from the API
export const fetchCartData = createAsyncThunk('cart/fetchCartData', async () => {
  const userId = localStorage.getItem('userId');
  const response = await axios.get(`https://10min.in/api/api/cart/get/${userId}`);
  return response.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.productId === newItem.productId);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.subTotal = existingItem.price * existingItem.quantity;
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          subTotal: newItem.price,
        });
      }
      state.totalQuantity++;
      state.totalAmount = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      state.billAmount = state.totalAmount; 
      state.discount = 0; 
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item.productId === id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter(item => item.productId !== id);
        } else {
          existingItem.quantity--;
          existingItem.subTotal = existingItem.price * existingItem.quantity;
        }
      }
      state.totalQuantity--;
      state.totalAmount = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      state.billAmount = state.totalAmount; // Update if needed
      state.discount = 0; // Update if there's a discount logic
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Assuming the API response has the same structure as your initial state
        state.cartItems = action.payload;
        state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = action.payload.reduce((total, item) => total + item.price * item.quantity, 0);
        state.billAmount = state.totalAmount; // Update if needed
        state.discount = 0; // Update if there's a discount logic
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default cartSlice.reducer;
export const { addItem, removeItem } = cartSlice.actions;
