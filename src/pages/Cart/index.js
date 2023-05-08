import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertDialog from "../../components/AlertDialog";
import EntryTicketCartItem from "../../components/EntryTicketCartItem";
import Header from "../../components/Header";
import ShowTicketCartItem from "../../components/ShowTicketCartItem";
import StoreOrderCartItem from "../../components/StoreOrderCartItem";
import { clearCartState } from "../../redux/cartSlice";
import { postPlaceOrder } from "../../utils/api";
import { cartData } from "../../utils/dummy_data";
import { emitNotification } from "../../utils/emitNotification";
import { convertToPlaceOrderRequestBody } from "../../utils/function_helper";
import "./style.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const entryTickets = useSelector((state) => state.cart.entryTickets);
  const showTickets = useSelector((state) => state.cart.showTickets);
  const storeOrder = useSelector((state) => state.cart.storeOrder);
  const [isConfirmClearCartOpen, setIsConfirmClearCartOpen] = useState(false);

  const handleClearCart = () => {
    setIsConfirmClearCartOpen(false);
    dispatch(clearCartState());
  };

  const handleCheckout = () => {
    const requestBody = convertToPlaceOrderRequestBody(
      entryTickets,
      showTickets,
      storeOrder,
      user.user_id
    );
    const placeOrder = async () => {
      try {
        const placeOrderResponse = await postPlaceOrder(
          accessToken,
          cartData
        );
        const message = placeOrderResponse.data.message;
        const allotedParkingLots = placeOrderResponse.data.allotedParkingLots;
        //TODO PROCEED TO PAYMENT
      } catch (error) {
        emitNotification("error", error.response.data.message);
      }
    };
    placeOrder();
  };

  return (
    <div className="cart-container">
      <Header />
      <h1>Cart</h1>
      <div className="cart-section">
        <h2>Entry Tickets</h2>
        <ul>
          {entryTickets.map((entryTicket) => (
            <EntryTicketCartItem entryTicketItem={entryTicket} />
          ))}
        </ul>
      </div>
      <div className="cart-section">
        <h2>Show Tickets</h2>
        <ul>
          {showTickets.map((showTicket) => (
            <ShowTicketCartItem
              key={showTicket.id}
              showTicketItem={showTicket}
            />
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
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
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
