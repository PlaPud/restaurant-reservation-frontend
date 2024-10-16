import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface Props {
  isOpen: boolean;
  code: string;
  message: string;
  onClose: () => Promise<any>;
}
const ErrorPopup = (props: Props) => {
  const { isOpen, code, message, onClose } = props;

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle color="error">Error {code}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="error">
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ErrorPopup;
