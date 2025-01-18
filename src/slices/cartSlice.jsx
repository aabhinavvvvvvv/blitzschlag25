import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload; // { day, flagshipEvent, passName, quantity, totalAmount }
      const existingItemIndex = state.cartItems.findIndex(
        (item) =>
          item.passName === newItem.passName &&
          item.day === newItem.day &&
          item.flagshipEvent === newItem.flagshipEvent
      );

      if (existingItemIndex !== -1) {
        // Update existing item quantity and total amount
        state.cartItems[existingItemIndex].quantity += newItem.quantity;
        state.cartItems[existingItemIndex].totalAmount += newItem.totalAmount;
      } else {
        // Add new item to the cart
        state.cartItems.push(newItem);
      }

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const { passName, day, flagshipEvent } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) =>
          item.passName !== passName ||
          item.day !== day ||
          item.flagshipEvent !== flagshipEvent
      );

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    // cartSlice.js
updateCartItemQuantity: (state, action) => {
    const { item, newQuantity } = action.payload;
  
    const foundItem = state.cartItems.find(
      (i) =>
        i.passName === item.passName &&
        i.day === item.day &&
        i.flagshipEvent === item.flagshipEvent
    );
  
    if (foundItem && newQuantity > 0) {
      foundItem.quantity = newQuantity;
      foundItem.totalAmount = (foundItem.totalAmount / foundItem.quantity) * newQuantity;
    }
  
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(state.cartItems));
  },
  

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
