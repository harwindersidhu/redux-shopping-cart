import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false
  },
  reducers: {
    addToCart(state, action) {
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

export const sendCartData = (cart) => {
  return async (dispatch) => {
    //Notification as Sending request
    dispatch(uiActions.showNotification({
      open: true,
      type: "warning",
      message: "Sending Request"
    }));

    const sendRequest = async () => {
      const res = await fetch(
        "https://redux-shopping-cart-3d386-default-rtdb.firebaseio.com/cartItems.json", {
        method: "PUT",
        body: JSON.stringify(cart)
      });
      const data = await res.json();
      //Notification as success
      dispatch(uiActions.showNotification({
        open: true,
        type: "success",
        message: "Request sent to database successfully"
      }));
    };

    try {
      await sendRequest();
    } catch (error) {
      dispatch(uiActions.showNotification({
        open: true,
        type: "erroe",
        message: `Sending Request failed with error: ${error}`
      }));
    }
  }
}

export const cartActions = cartSlice.actions;

export default cartSlice;