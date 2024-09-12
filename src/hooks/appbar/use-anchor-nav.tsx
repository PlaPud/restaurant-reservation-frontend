import React, { MouseEvent, useState } from "react";

const useAnchor = () => {
  const [anchorEl, setAnchorNav] = useState<null | HTMLElement>(null);

  const handleClickOpen = (e: MouseEvent<HTMLElement>) => {
    setAnchorNav(e.currentTarget as HTMLElement);
  };

  const handleClickClose = () => {
    setAnchorNav(null);
  };

  return { anchorEl, handleClickOpen, handleClickClose };
};

export default useAnchor;
