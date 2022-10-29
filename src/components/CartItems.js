import React from "react";
import CartItem from "./CartItem";
import "./Cart.css";
import { useSelector } from "react-redux";
const CartItems = () => {
  const cartItemsList = useSelector((state) => state.cart.itemList);
  const cartItems = cartItemsList.map((item) => {
    return <li key={item.id}>
      <CartItem 
        id={item.id}
        name={item.name}
        price={item.price}
        total={item.totalPrice}
        quantity={item.quantity}
      /> 
    </li>
  })
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul>
        {cartItems}
      </ul>
    </div>
  );
};

export default CartItems;
