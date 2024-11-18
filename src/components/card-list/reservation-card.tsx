import {
  Check,
  CheckRounded,
  ClearRounded,
  Delete,
  Edit,
  HourglassBottom,
  LockClock,
  Timer,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { ReservationResData } from "../../shared/interface/user";
import {
  getFormatDateTime,
  isReserveCutOff,
} from "../../shared/utils/mock-utils";

interface Props {
  isCustomerView?: boolean;
  isInspectSlip?: boolean;
  reservation: ReservationResData;
  onEditBtnClicked?: (value?: any) => any;
  onDeleteBtnClicked?: (value?: any) => any;
  onInspectSlipBtnClicked?: (value?: any) => any;
  onApproveBtnClicked?: (value?: any) => any;
  onCancelBtnClicked?: () => any;
}

const ReservationCard = (props: Props) => {
  const {
    isCustomerView,
    isInspectSlip,
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
        {buildDoneReservationStatusText(reservation)}
        {buildNameText(reservation, isCustomerView)}
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
        {buildSlipTimeStamp(reservation)}
      </CardContent>
      <CardActions
        sx={{
          width: "45%",
        }}
      >
        {buildCustomizeButton(
          reservation,
          isCustomerView,
          onEditBtnClicked,
          onDeleteBtnClicked
        )}
        {buildPricedApprovePanel(
          reservation,
          isCustomerView,
          onInspectSlipBtnClicked,
          onApproveBtnClicked,
          onCancelBtnClicked
        )}
        {buildFreeApprovePanel(
          reservation,
          isCustomerView,
          onApproveBtnClicked,
          onCancelBtnClicked
        )}
      </CardActions>
    </Card>
  );
};

const buildFreeApprovePanel = (
  reservation: ReservationResData,
  isCustomerView: boolean,
  onApproveBtnClicked: (value?: any) => any,
  onCancelBtnClicked: () => any
) => {
  return (
    !isCustomerView &&
    !reservation.isAttended &&
    !isReserveCutOff(reservation.reserveDate) &&
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
    )
  );
};

const buildPricedApprovePanel = (
  reservation: ReservationResData,
  isCustomerView,
  onInspectSlipBtnClicked: (value?: any) => any,
  onApproveBtnClicked?: (value?: any) => any,
  onCancelBtnClicked?: () => any
) => {
  return (
    reservation.customer &&
    reservation.reservePrice !== 0 &&
    reservation.payImgUrl !== "" && (
      <>
        <Button
          variant="outlined"
          color="info"
          onClick={async () => {
            await onInspectSlipBtnClicked(reservation.payImgUrl);
          }}
        >
          สลิปโอนเงิน
        </Button>
        {!isCustomerView &&
          !reservation.isAttended &&
          !isReserveCutOff(reservation.reserveDate) && (
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
    )
  );
};

const buildSlipTimeStamp = (reservation: ReservationResData) => {
  return (
    reservation.customer && (
      <Typography
        sx={{ color: "grey", fontSize: "0.85rem" }}
        noWrap
        textOverflow={"ellipsis"}
      >
        เวลาแนบหลักฐานการจอง: {getFormatDateTime(reservation.lastModified)}
      </Typography>
    )
  );
};

const buildDoneReservationStatusText = (reservation: ReservationResData) => {
  return reservation.isAttended ? (
    <Typography
      display={"flex"}
      alignItems={"center"}
      color="success"
      noWrap
      textOverflow={"ellipsis"}
    >
      <Check fontSize="small" />
      <Box ml={1}>เข้าร้านแล้ว</Box>
    </Typography>
  ) : isReserveCutOff(reservation.reserveDate) ? (
    <Typography
      display={"flex"}
      alignItems={"center"}
      color="error"
      noWrap
      textOverflow={"ellipsis"}
    >
      <HourglassBottom fontSize="small" />
      <Box ml={1}>การจองหมดอายุ</Box>
    </Typography>
  ) : null;
};

const buildCustomizeButton = (
  reservation: ReservationResData,
  isCustomerView: boolean,
  onEditBtnClicked?: (value?: any) => any,
  onDeleteBtnClicked?: (value?: any) => any
) => {
  return (
    !isCustomerView && (
      <>
        <Button variant="outlined" color="primary" onClick={onEditBtnClicked}>
          <Edit />
        </Button>
        {!reservation.customer && (
          <Button variant="outlined" color="error" onClick={onDeleteBtnClicked}>
            <Delete />
          </Button>
        )}
      </>
    )
  );
};

const buildNameText = (
  reservation: ReservationResData,
  isCustomerView: boolean
) => {
  return reservation.customer ? (
    isCustomerView ? (
      <Typography noWrap textOverflow={"ellipsis"}>
        ชื่อร้าน: {reservation.restaurant.name}
      </Typography>
    ) : (
      <Typography noWrap textOverflow={"ellipsis"}>
        ชื่อผู้จอง: {reservation.customer.fName} {reservation.customer.lName}
      </Typography>
    )
  ) : (
    <Typography
      sx={{ fontSize: "1.2rem" }}
      color="success"
      noWrap
      textOverflow={"ellipsis"}
    >
      การจองว่าง
    </Typography>
  );
};
export default ReservationCard;
