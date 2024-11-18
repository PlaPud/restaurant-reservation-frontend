import { Add } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2 as Grid,
} from "@mui/material";
import {
  DateTimePicker,
  DateTimeValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { ChangeEvent } from "react";
import { GeneralInputField } from "../../../components/forms/general-form-field";

export interface ReservationFormData {
  seats: number;
  reservePrice: number;
  reserveDate: number | null;
}

interface Props {
  formData: ReservationFormData;
  isOpen: boolean;
  onDateChange: (
    value: Date,
    context: PickerChangeHandlerContext<DateTimeValidationError>
  ) => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => Promise<void>;
  onClose: () => void;
}

const CreateReserveModal = (props: Props) => {
  const { isOpen, onClose, formData, onSubmit, onChange, onDateChange } = props;

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>สร้างรายการจองใหม่</DialogTitle>
        <DialogContent>
          <DialogContentText>โปรดระบุรายละเอียดรายการจอง</DialogContentText>
          <Grid mt={2} container spacing={1}>
            <Grid mt={1} size={{ xs: 6, md: 3 }}>
              <GeneralInputField
                type={"number"}
                onChange={onChange}
                id={"seat-field"}
                name={"seats"}
                label={"จำนวนที่นั่ง"}
                filledValue={String(formData.seats)}
              />
            </Grid>
            <Grid mt={1} size={{ xs: 6, md: 4 }}>
              <GeneralInputField
                type={"number"}
                onChange={onChange}
                id={"price-field"}
                name={"reservePrice"}
                label={"ราคา/ค่ามัดจำ"}
                filledValue={String(formData.reservePrice)}
              />
            </Grid>
            <Grid mt={1} size={{ xs: 6, md: 5 }}>
              <DateTimePicker
                defaultValue={new Date(formData.reserveDate)}
                disablePast
                label={"เวลาจอง"}
                value={
                  formData.reserveDate ? new Date(formData.reserveDate) : null
                }
                name={"reserveDate"}
                onAccept={onDateChange}
                onChange={onDateChange}
              />
            </Grid>
          </Grid>
          <Grid mt={5} container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Button
                onClick={onClose}
                variant="outlined"
                color="primary"
                size="large"
                fullWidth
              >
                ยกเลิก
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Button
                onClick={onSubmit}
                sx={{ color: "white" }}
                variant="contained"
                color="primary"
                size="large"
                startIcon={<Add />}
                fullWidth
              >
                เพิ่มรายการจอง
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateReserveModal;
