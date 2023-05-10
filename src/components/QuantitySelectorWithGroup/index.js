import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Checkbox, FormControlLabel } from "@mui/material";

const QuantitySelectorWithGroupModal = ({
  isOpen,
  itemTitle,
  pricePerItem,
  onClose,
  onAddToCart,
  groupData,
}) => {
  const [quantity, setQuantity] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const totalPrice = (quantity * pricePerItem).toFixed(2);
  const [isSelfSelected, setIsSelfSelected] = useState(false);

  useEffect(() => {
    if (selectedGroup == null) {
      setQuantity(0);
    } else {
      const childrenCount = selectedGroup.children.length;
      setQuantity(childrenCount);
    }
  },[selectedGroup]);


  const handleAddToCart = () => {
    onAddToCart(selectedGroup, quantity, isSelfSelected);
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
          <FormControlLabel
          key="self-select"
          control={
            <Checkbox
            checked={isSelfSelected}
            onChange={(e) => setIsSelfSelected(e.target.checked)}
            />
          }
          label="Buy tickets for yourself?"
          />
          <div className="quantity-selector-item-details">
            <div>Price per item:</div>
            <div>{pricePerItem}</div>
          </div>
          <div className="quantity-selector-quantity-details">
            <div>Quantity:</div>
            <div>
              <span>{quantity}</span>
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

export default QuantitySelectorWithGroupModal;

