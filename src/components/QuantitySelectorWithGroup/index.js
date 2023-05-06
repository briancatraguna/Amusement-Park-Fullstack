import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const QuantitySelectorModal = ({
  isOpen,
  itemTitle,
  pricePerItem,
  onClose,
  onAddToCart,
  groupData,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const totalPrice = (quantity * pricePerItem).toFixed(2);

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleMinus = () => {
    if (quantity === 1) {
      handleClose();
    } else {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(selectedGroup, quantity);
    handleClose();
  };

  const handleClose = () => {
    setQuantity(1);
    setSelectedGroup(null);
    onClose();
  };

  const handleGroupSelect = (event) => {
    const selectedGroupId = event.target.value;
    const selectedGroup = groupData.find(
      (group) => group.id === selectedGroupId
    );
    setSelectedGroup(selectedGroup);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="quantity-selector-modal">
        <div className="quantity-selector-header">
          <span className="quantity-selector-title">{itemTitle}</span>
          <Button onClick={handleClose}>Close</Button>
        </div>
        <div className="quantity-selector-body">
          {groupData && (
            <div className="quantity-selector-group">
              <div>Group:</div>
              <Select value={selectedGroup?.id} onChange={handleGroupSelect}>
                {groupData.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
          <div className="quantity-selector-item-details">
            <div>Price per item:</div>
            <div>{pricePerItem}</div>
          </div>
          <div className="quantity-selector-quantity-details">
            <div>Quantity:</div>
            <div>
              <Button
                variant="outlined"
                style={{ margin: "20px" }}
                onClick={handleMinus}
              >
                -
              </Button>
              <span>{quantity}</span>
              <Button
                variant="outlined"
                style={{ margin: "20px" }}
                onClick={handleAdd}
              >
                +
              </Button>
            </div>
          </div>
          <div className="quantity-selector-total-details">
            <div>Total Price:</div>
            <div>{totalPrice}</div>
          </div>
        </div>
        <div className="quantity-selector-footer">
          <Button
            variant="contained"
            onClick={handleAddToCart}
            disabled={!selectedGroup}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default QuantitySelectorModal;

