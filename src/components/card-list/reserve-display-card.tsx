import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import React, { MouseEvent } from "react";
import { getFormatDateTime } from "../../shared/utils/mock-utils";
import { Edit, EventAvailable } from "@mui/icons-material";
import { ReservationResData } from "../../shared/interface/user";

interface Props {
  reservation: ReservationResData;
  onReserveBtnClicked: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const ReserveDisplayCard = (props: Props) => {
  const { reservation, onReserveBtnClicked } = props;

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        px: 2,
      }}
    >
      <CardContent
        sx={{
          width: "70%",
        }}
      >
        <Box display={"flex"} alignContent={"center"}>
          <Typography display={{ xs: "none", md: "block" }}>เวลา: </Typography>
          <Typography ml={1} fontSize={{ xs: "0.9rem", md: "1rem" }}>
            {getFormatDateTime(reservation.reserveDate)}
          </Typography>
        </Box>
        <Box display={"flex"} alignContent={"center"}>
          <Typography display={{ xs: "none", md: "block" }}>จำนวน: </Typography>
          <Typography ml={1} fontSize={{ xs: "0.9rem", md: "1rem" }}>
            {reservation.seats.toLocaleString()} ที่นั่ง
          </Typography>
        </Box>
        <Divider />
        <Box display={"flex"} textAlign={"center"} alignItems={"center"}>
          <Typography display={{ xs: "none", md: "block" }}>
            ราคา/ค่ามัดจำ:{" "}
          </Typography>
          <Typography ml={1} fontSize={{ xs: "1rem", md: "1.25rem" }}>
            {reservation.reservePrice.toLocaleString()} บาท
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={onReserveBtnClicked}
        >
          <Typography display={{ xs: "block", md: "none" }}>
            <EventAvailable />
          </Typography>
          <Typography display={{ xs: "none", md: "flex" }}>
            <EventAvailable />
            <Box ml={1}>จองเวลานี้</Box>
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ReserveDisplayCard;
