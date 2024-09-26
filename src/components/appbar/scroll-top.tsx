import { Box, Fade } from "@mui/material";
import { ReactNode } from "react";
import { useScrollTop } from "../../hooks/appbar/use-scroll-top";

type Props = {
  children: ReactNode;
};

export const ScrollTop = ({ children }: Props) => {
  const { triggerScrollTop, handleClick } = useScrollTop();

  return (
    <Fade in={triggerScrollTop}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: "50%" }}
      >
        {children}
      </Box>
    </Fade>
  );
};
