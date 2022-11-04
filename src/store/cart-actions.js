import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchData = () => {
  return async(dispatch) => {
    const fetchHandler = async() => {
      const res = await fetch("https://redux-shopping-cart-3d386-default-rtdb.firebaseio.com/cartItems.json");
      const data = await res.json();
      return data;
    }

    try {
      const cartData = await fetchHandler();
      dispatch(cartActions.replaceData(cartData));
    } catch (error) {
      dispatch(uiActions.showNotification({
        open: true,
        type: "error",
        message: `fetching Request failed!`
      }));
    }
  }
};

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
        type: "error",
        message: `Sending Request failed with error: ${error}`
      }));
    }
  }
}