import React, { MouseEvent, MouseEventHandler } from "react";
import { ReservationResData } from "../../shared/interface/user";
import { Box, Container } from "@mui/material";
import ReserveDisplayCard from "./reserve-display-card";
import { getMockReservationData } from "../../shared/utils/mock-utils";

interface Props {
  collections: ReservationResData[];
  onEachReserveBtnClicked: (id: string) => Promise<void>;
}

const ReserveDisplayCardList = (props: Props) => {
  const { collections, onEachReserveBtnClicked } = props;

  return (
    <>
      <Container
        sx={{
          my: 2,
          height: "50vh",
        }}
      >
        {collections.map((rs) => (
          <Box my={1}>
            <ReserveDisplayCard
              key={rs.reserveId}
              reservation={rs}
              onReserveBtnClicked={() => onEachReserveBtnClicked(rs.reserveId)}
            />
          </Box>
        ))}
      </Container>
    </>
  );
};

export default ReserveDisplayCardList;
