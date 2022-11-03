import { async } from 'q';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Auth from "./components/Auth";
import Layout from "./components/Layout";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const cart = useSelector(state => state.cart);
  
  useEffect(() => {
    const sendRequest = async () => {
      const res = await fetch(
        "https://redux-shopping-cart-3d386-default-rtdb.firebaseio.com/cartItems.json", {
        method: "PUT",
        body: JSON.stringify(cart)
      });
      const data = await res.json();
      console.log("Send Request respone: ", data);
    };
    sendRequest();
  }, [cart]);

  return (
    <div className="App">
       { !isLoggedIn && <Auth /> }
       { isLoggedIn && <Layout /> }
    </div>
  );
}

export default App;
