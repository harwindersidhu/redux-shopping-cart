import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from './components/Notification';
import { uiActions } from './store/ui-slice';
let isFirstRender = true;

function App() {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    
    const sendRequest = async () => {
      //Notification as Sending request
      dispatch(uiActions.showNotification({
        open: true,
        type: "warning",
        message: "Sending Request"
      }));

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
    sendRequest().catch(error => {
      //Notification as error
      dispatch(uiActions.showNotification({
        open: true,
        type: "erroe",
        message: `Sending Request failed with error: ${error}`
      }));
    });
  }, [cart, dispatch]);

  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message} />}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
