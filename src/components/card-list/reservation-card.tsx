import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { getFormatDateTime } from "../../shared/utils/mock-utils";
import { CheckRounded, ClearRounded, Delete, Edit } from "@mui/icons-material";
import { ReservationResData } from "../../shared/interface/user";

interface Props {
  reservation: ReservationResData;
  onEditBtnClicked: (value?: any) => any;
  onDeleteBtnClicked: (value?: any) => any;
  onInspectSlipBtnClicked: (value?: any) => any;
  onApproveBtnClicked: (value?: any) => any;
  onCancelBtnClicked: () => any;
}

const ReservationCard = (props: Props) => {
  const {
    reservation,
    onEditBtnClicked,
    onDeleteBtnClicked,
    onInspectSlipBtnClicked,
    onApproveBtnClicked,
    onCancelBtnClicked,
  } = props;

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <CardContent
        sx={{
          width: "55%",
        }}
      >
        {reservation.customer ? (
          <Typography noWrap textOverflow={"ellipsis"}>
            ชื่อผู้จอง: {reservation.customer.fName}{" "}
            {reservation.customer.lName}
          </Typography>
        ) : (
          <Typography
            sx={{ fontSize: "1.2rem" }}
            color="success"
            noWrap
            textOverflow={"ellipsis"}
          >
            การจองว่าง
          </Typography>
        )}
        <Typography noWrap textOverflow={"ellipsis"}>
          จำนวน: {reservation.seats.toLocaleString()} ที่นั่ง
        </Typography>
        <Typography noWrap textOverflow={"ellipsis"}>
          เวลา: {getFormatDateTime(reservation.reserveDate)}
        </Typography>
        <Divider />
        <Typography
          sx={{ fontSize: "1.2rem" }}
          noWrap
          textOverflow={"ellipsis"}
        >
          ราคา/ค่ามัดจำ: {reservation.reservePrice.toLocaleString()} บาท
        </Typography>
        {reservation.customer && (
          <Typography
            sx={{ color: "grey", fontSize: "0.85rem" }}
            noWrap
            textOverflow={"ellipsis"}
          >
            เวลาแนบหลักฐานการจอง: {getFormatDateTime(reservation.lastModified)}
          </Typography>
        )}
      </CardContent>
      <CardActions
        sx={{
          width: "45%",
        }}
      >
        <Button variant="outlined" color="primary" onClick={onEditBtnClicked}>
          <Edit />
        </Button>
        {!reservation.customer && (
          <Button variant="outlined" color="error" onClick={onDeleteBtnClicked}>
            <Delete />
          </Button>
        )}
        {reservation.customer &&
          reservation.reservePrice !== 0 &&
          reservation.payImgUrl !== "" && ( // TODO: CHANGE INTO !== AFTER INTEGRATE WITH BACKEND
            <>
              <Button
                variant="outlined"
                color="info"
                onClick={onInspectSlipBtnClicked}
              >
                สลิปโอนเงิน
              </Button>
              {!reservation.isAttended && (
                <>
                  <IconButton size="large" onClick={onApproveBtnClicked}>
                    <CheckRounded color="primary" />
                  </IconButton>
                  <IconButton size="large" onClick={onCancelBtnClicked}>
                    <ClearRounded />
                  </IconButton>
                </>
              )}
            </>
          )}
        {!reservation.isAttended &&
          reservation.customer &&
          reservation.reservePrice === 0 && (
            <>
              <IconButton size="large" onClick={onApproveBtnClicked}>
                <CheckRounded color="primary" />
              </IconButton>
              <IconButton size="large" onClick={onCancelBtnClicked}>
                <ClearRounded />
              </IconButton>
            </>
          )}
      </CardActions>
    </Card>
  );
};

export default ReservationCard;
