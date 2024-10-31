import { Box, Divider, Skeleton } from "@mui/material";
import React from "react";

const ReservationDetailSkeleton = () => {
  return (
    <>
      <Box m={3}>
        <Skeleton variant="text" width={"80%"} />
        <Skeleton variant="text" width={"80%"} />
        <Skeleton variant="text" width={"80%"} />
      </Box>
      <Divider />
      <Box m={3}>
        <Skeleton variant="text" width={"80%"} />
        <Skeleton variant="text" width={"80%"} />
        <Skeleton variant="text" width={"80%"} />
        <Skeleton variant="text" width={"80%"} />
        <Skeleton variant="text" width={"80%"} />
      </Box>
      <Divider />
      <Box mx={3} mt={3}>
        <Skeleton variant="text" width={"80%"} />
      </Box>
      <Box mx={3} mb={3}>
        <Skeleton variant="text" width={"80%"} />
      </Box>
    </>
  );
};

export default ReservationDetailSkeleton;
