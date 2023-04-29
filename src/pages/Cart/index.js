import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import "./style.css";

const CartPage = () => {
  const tickets = useSelector((state) => state.cart.tickets);
  const parking = useSelector((state) => state.cart.parking);
  const storeOrder = useSelector((state) => state.cart.storeOrder);

  return (
    <div className="cart-container">
      <Header />
      <h1>Cart</h1>
      <div className="cart-section">
        <h2>Tickets</h2>
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id}>{/* render ticket details */}</li>
          ))}
        </ul>
      </div>
      <div className="cart-section">
        <h2>Parking</h2>
        <ul>
          {parking.map((parkingItem) => (
            <li key={parkingItem.id}>{/* render parking details */}</li>
          ))}
        </ul>
      </div>
      <div className="cart-section">
        <h2>Store Order</h2>
        <ul>
          {storeOrder.map((storeItem) => (
            <li key={storeItem.id}>{/* render store order details */}</li>
          ))}
        </ul>
      </div>
      <button className="checkout-button">Checkout</button>
    </div>
  );
};

export default CartPage;
