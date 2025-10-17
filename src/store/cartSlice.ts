import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MenuItem } from '../navigation/types';

export interface CartItem extends MenuItem {
  quantity: number;
  selectedAddOns?: string[];
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.itemID === action.payload.itemID
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        if (action.payload.selectedAddOns) {
          existingItem.selectedAddOns = action.payload.selectedAddOns;
        }
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.itemID !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ itemID: number; quantity: number }>
    ) => {
      const item = state.items.find(
        item => item.itemID === action.payload.itemID
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
