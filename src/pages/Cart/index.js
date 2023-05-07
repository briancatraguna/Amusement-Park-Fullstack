import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertDialog from "../../components/AlertDialog";
import Header from "../../components/Header";
import ShowTicketCartItem from "../../components/ShowTicketCartItem";
import StoreOrderCartItem from "../../components/StoreOrderCartItem";
import { clearCartState } from "../../redux/cartSlice";
import "./style.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const entryTickets = useSelector((state) => state.cart.entryTickets);
  const showTickets = useSelector((state) => state.cart.showTickets);
  const storeOrder = useSelector((state) => state.cart.storeOrder);
  const [isConfirmClearCartOpen, setIsConfirmClearCartOpen] = useState(false);

  const handleClearCart = () => {
    setIsConfirmClearCartOpen(false);
    dispatch(clearCartState());
  };

  return (
    <div className="cart-container">
      <Header />
      <h1>Cart</h1>
      <div className="cart-section">
        <h2>Entry Tickets</h2>
        <ul>
          {entryTickets.map((entryTicket) => (
            <li key={entryTicket.id}>{/* render ticket details */}</li>
          ))}
        </ul>
      </div>
      <div className="cart-section">
        <h2>Show Tickets</h2>
        <ul>
          {showTickets.map((showTicket) => (
            <ShowTicketCartItem key={showTicket.id} showTicketItem={showTicket}/>
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
        <button
          className="clear-cart-button"
          onClick={() => setIsConfirmClearCartOpen(true)}
        >
          Clear Cart
        </button>
        <button className="checkout-button">Checkout</button>
      </div>
      <AlertDialog
        isOpen={isConfirmClearCartOpen}
        onCancel={() => setIsConfirmClearCartOpen(false)}
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
