import React from "react";

interface Props {
  children?: React.ReactNode;
  currentIdx: number;
  index: number;
}

const ReservationTabPanel = (props: Props) => {
  const { children, currentIdx, index } = props;

  return <div hidden={currentIdx !== index}>{props.children}</div>;
};

export default ReservationTabPanel;
