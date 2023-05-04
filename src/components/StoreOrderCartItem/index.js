import React from "react";
import { useDispatch } from "react-redux";
import './style.css'

const StoreOrderCartItem = ({ storeItem }) => {
  const dispatch = useDispatch();
  const { item, quantity } = storeItem;

  return (
    <li className="store-order-cart-item">
      <div className="store-order-cart-item-container">
        <img src={item.menu_img_url} alt={item.menu_item_name} />
        <div>
          <h3>{item.menu_item_name}</h3>
          <p>{item.item_desc}</p>
          <p>Price per item: ${item.item_price}</p>
          <p>Quantity: {quantity}</p>
        </div>
      </div>
    </li>
  );
};

export default StoreOrderCartItem;