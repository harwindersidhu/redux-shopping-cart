import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
    changed: false
  },
  reducers: {
    replaceData(state, action) {
      //This function is used to replace the data with saved data we get from firebase after fetchData request
      state.totalQuantity = action.payload.totalQuantity;
      if (action.payload.itemsList) state.itemsList = action.payload.itemsList;
    },

    addToCart(state, action) {
      state.changed = true;
      const newItem = action.payload;

      //First we will check if this item is alredy existing, the we will add information accordingly
      const existingItem = state.itemsList.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name
        });
      }
      state.totalQuantity++;
    },

    removeFromCart(state, action) {
      state.changed = true;
      const id = action.payload;

      const existingItem = state.itemsList.find(item => item.id === id);

      if (existingItem.quantity === 1) {
        state.itemsList = state.itemsList.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      state.totalQuantity--;
    },

    setShowCart(state) {
      state.showCart = !state.showCart;
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice;