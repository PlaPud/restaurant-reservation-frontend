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
  title: string;
  text: string;
  onConfirm: (value?: any) => Promise<any>;
  onClose: () => void;
}
const ConfirmPopup = (props: Props) => {
  const { isOpen, title, text, onConfirm, onClose } = props;

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle color="success">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="success">
            ยกเลิก
          </Button>
          <Button onClick={onConfirm} variant="contained" color="success">
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmPopup;
