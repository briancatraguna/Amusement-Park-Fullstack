import { Button, Modal } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
import "./style.css";

const QuantitySelector = ({
  isOpen,
  itemTitle,
  pricePerItem,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const totalPrice = quantity * pricePerItem;

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleMinus = () => {
    if (quantity === 1) {
      handleClose()
    } else {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(quantity);
    handleClose();
  };

  const handleClose = () => {
    setQuantity(1);
    onClose();
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="quantity-selector-modal">
        <div className="quantity-selector-header">
          <span className="quantity-selector-title">{itemTitle}</span>
          <Button onClick={handleClose}>Close</Button>
        </div>
        <div className="quantity-selector-body">
          <div className="quantity-selector-item-details">
            <div>Price per item:</div>
            <div>{pricePerItem}</div>
          </div>
          <div className="quantity-selector-quantity-details">
            <div>Quantity:</div>
            <div>
              <Button variant="outlined" style={{margin:"20px"}}onClick={handleMinus}>-</Button>
              <span>{quantity}</span>
              <Button variant="outlined" style={{margin:"20px"}} onClick={handleAdd}>+</Button>
            </div>
          </div>
          <div className="quantity-selector-total-details">
            <div>Total Price:</div>
            <div>{totalPrice}</div>
          </div>
        </div>
        <div className="quantity-selector-footer">
          <Button variant="contained" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default QuantitySelector;
