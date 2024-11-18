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
  onClose: () => Promise<any>;
}
const InfoPopup = (props: Props) => {
  const { isOpen, title, text, onClose } = props;

  return (
    <>
      <Dialog open={isOpen ?? false} onClose={onClose}>
        <DialogTitle color="info">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size={"large"} onClick={onClose} variant="text" color="info">
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InfoPopup;
