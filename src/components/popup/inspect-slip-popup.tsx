import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface Props {
  imgUrl: string;
  isOpen: boolean;
  onClose: () => Promise<any>;
}

const InspectSlipPopup = ({ isOpen, imgUrl, onClose }: Props) => {
  return (
    <>
      <Dialog open={isOpen ?? false} onClose={onClose}>
        <DialogTitle color="info">หลักฐานการโอนเงิน</DialogTitle>
        <DialogContent sx={{ maxHeight: "60vh" }}>
          {imgUrl ? (
            <img src={imgUrl} alt="payment-img" />
          ) : (
            <Typography>ไม่พบ URL ของรูปภาพ</Typography>
          )}
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

export default InspectSlipPopup;
