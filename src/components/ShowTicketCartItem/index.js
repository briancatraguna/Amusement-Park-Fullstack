import React from "react";
import "./style.css";

const ShowTicketCartItem = ({ showTicketItem }) => {
  const { group, item, quantity } = showTicketItem;
  const { sw_name, sw_desc, sw_price, sw_img_url } = item;

  return (
    <li className="show-ticket-cart-item">
      <div className="show-ticket-cart-item-container">
        <img src={sw_img_url} alt={sw_name} />
        <div>
          <h3>{sw_name}</h3>
          <p>{sw_desc}</p>
          <p>Price per item: ${sw_price}</p>
          <p>Quantity: {quantity}</p>
          {group && (
            <div>
              <p>Group:</p>
              <ul>
                {group.children.map((child) => (
                  <li key={child.visitor_id}>{child.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default ShowTicketCartItem;