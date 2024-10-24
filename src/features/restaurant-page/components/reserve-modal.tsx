import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
} from "@mui/material";
import React, { MouseEvent } from "react";
import ReservationCard from "../../../components/card-list/reservation-card";
import { grey } from "@mui/material/colors";
import ReserveDisplayCard from "../../../components/card-list/reserve-display-card";
import { getMockReservationData } from "../../../shared/utils/mock-utils";
import { Close } from "@mui/icons-material";
import ReserveDisplayCardList from "../../../components/card-list/reserve-display-card-list";
import { ReservationResData } from "../../../shared/interface/user";

interface Props {
  isOpen: boolean;
  collections: ReservationResData[];
  onEachReserveBtnClick: (id: string) => Promise<void>;
  onClose: () => Promise<void>;
}

const ReserveModal = (props: Props) => {
  const { isOpen, collections, onClose, onEachReserveBtnClick } = props;

  return (
    <>
      <Dialog fullWidth maxWidth={"lg"} open={isOpen} onClose={onClose}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <DialogTitle>รายการคิวทั้งหมด</DialogTitle>
          <DialogActions>
            <IconButton onClick={onClose} size="large">
              <Close />
            </IconButton>
          </DialogActions>
        </Box>
        <Paper
          variant="outlined"
          sx={{ mx: 2, my: 4, backgroundColor: grey.A100 }}
        >
          <DialogContent>
            <ReserveDisplayCardList
              collections={collections}
              onEachReserveBtnClicked={onEachReserveBtnClick}
            />
          </DialogContent>
        </Paper>
      </Dialog>
    </>
  );
};

export default ReserveModal;
