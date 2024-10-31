import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

interface Props {
  isLoading: boolean;
}

const LoadingBackdrop = (props: Props) => {
  const { isLoading } = props;

  return (
    <Backdrop
      sx={(theme) => ({
        color: "#fff00",
        zIndex: theme.zIndex.drawer + 1,
      })}
      open={isLoading}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default LoadingBackdrop;
