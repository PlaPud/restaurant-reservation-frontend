import { Box, Container, Skeleton } from "@mui/material";
import { ReservationResData } from "../../shared/interface/user";
import ReservationCard from "./reservation-card";

interface Props {
  collections: ReservationResData[];
  onEachEditClick: (value?: any) => Promise<void>;
  onEachDelClick: (value?: any) => Promise<void>;
  onEachApproveClick: (value?: any) => Promise<void>;
  onEachCheckAttendClick: (value?: any) => Promise<void>;
  onEachCancelClick: (value?: any) => Promise<void>;
  onEachInspectSlipClick: (value?: any) => Promise<void>;
}

const ReservationCardList = (props: Props) => {
  const {
    collections,
    onEachEditClick,
    onEachDelClick,
    onEachApproveClick,
    onEachCheckAttendClick,
    onEachCancelClick,
    onEachInspectSlipClick,
  } = props;

  return (
    <Container>
      {collections
        ? collections.map((reservation) => (
            <Box mt={2} key={reservation.reserveId}>
              <ReservationCard
                reservation={reservation}
                onEditBtnClicked={async () => {
                  await onEachEditClick(reservation);
                }}
                onInspectSlipBtnClicked={async () => {
                  await onEachInspectSlipClick(reservation);
                }}
                onApproveBtnClicked={async () => {
                  reservation.isPayed
                    ? await onEachCheckAttendClick(reservation)
                    : await onEachApproveClick(reservation);
                }}
                onCancelBtnClicked={async () => {
                  await onEachCancelClick(reservation);
                }}
                onDeleteBtnClicked={async () =>
                  await onEachDelClick(reservation)
                }
              />
            </Box>
          ))
        : Array.from({ length: 5 }, (_, idx) => (
            <Box mt={2}>
              <Skeleton
                key={idx}
                width={"100%"}
                height={"100px"}
                variant="rounded"
                animation="wave"
              />
            </Box>
          ))}
    </Container>
  );
};

export default ReservationCardList;
