import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const incoming = action.payload;
      const existingIndex = state.items.findIndex(i => i.name === incoming.name);
      if (existingIndex !== -1) {
        state.items[existingIndex].quantity += incoming.quantity ?? 1;
      } else {
        state.items.push({ ...incoming, quantity: incoming.quantity ?? 1 });
      }
    },
    removeItem: (state, action) => {
      const name = action.payload?.name ?? action.payload;
      state.items = state.items.filter(i => i.name !== name);
    },
    updateQuantity: (state, action) => {
      const { name, delta, quantity } = action.payload;
      const item = state.items.find(i => i.name === name);
      if (!item) return;
      if (typeof quantity === 'number') {
        item.quantity = Math.max(0, quantity);
      } else if (typeof delta === 'number') {
        item.quantity = Math.max(0, item.quantity + delta);
      }
      if (item.quantity === 0) {
        state.items = state.items.filter(i => i.name !== name);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
