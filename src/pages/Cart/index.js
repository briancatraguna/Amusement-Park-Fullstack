import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertDialog from "../../components/AlertDialog";
import Header from "../../components/Header";
import StoreOrderCartItem from "../../components/StoreOrderCartItem";
import { clearCartState } from "../../redux/cartSlice";
import "./style.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.cart.tickets);
  const parking = useSelector((state) => state.cart.parking);
  const storeOrder = useSelector((state) => state.cart.storeOrder);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleClearCart = () => {
    setIsConfirmOpen(false);
    dispatch(clearCartState());
  };

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
            <StoreOrderCartItem key={storeItem.id} storeItem={storeItem} />
          ))}
        </ul>
      </div>
      <div className="cart-buttons-container">
        <button className="clear-cart-button" onClick={() => setIsConfirmOpen(true)}>
          Clear Cart
        </button>
        <button className="checkout-button">Checkout</button>
      </div>
      <AlertDialog
      isOpen={isConfirmOpen}
      onCancel={() => setIsConfirmOpen(false)}
      onConfirm={handleClearCart}
      negativeButtonTitle="Cancel"
      positiveButtonTitle="Clear"
      dialogTitle="Confirm Clear Cart"
      dialogContent="Are you sure you want to clear cart?"
      />
    </div>
  );
};

export default CartPage;
