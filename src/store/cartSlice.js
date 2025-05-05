import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch {}
};

const initialState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartToStorage(state.items);
      toast.success(`${action.payload.title} added to cart`);
    },
    removeFromCart: (state, action) => {
      const removedItem = state.items.find(i => i.id === action.payload);
      state.items = state.items.filter(i => i.id !== action.payload);
      saveCartToStorage(state.items);
      toast.error(`${removedItem?.title || 'Product'} removed from cart`);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
      toast.success('Cart cleared');
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      saveCartToStorage(state.items);
      toast.success(`${action.payload.title} quantity decreased`);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
