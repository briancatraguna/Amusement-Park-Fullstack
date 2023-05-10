import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import React from "react";

const AlertDialog = ({
  isOpen,
  onCancel,
  onConfirm,
  negativeButtonTitle,
  positiveButtonTitle,
  dialogTitle,
  dialogContent,
}) => {
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <p>{dialogContent}</p>
      </DialogContent>
      <DialogActions>
        {negativeButtonTitle && <Button onClick={onCancel}>{negativeButtonTitle}</Button>}
        <Button onClick={onConfirm}>{positiveButtonTitle}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
