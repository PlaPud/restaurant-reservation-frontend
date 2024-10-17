import { Email, Phone } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";

interface Props {
  phone: string;
  email: string;
}

const ContactBox = (props: Props) => {
  return (
    <>
      <h3>ช่องทางติดต่อ</h3>
      <Box mt={2} display={"flex"} alignContent={"center"}>
        <Phone />
        <Box ml={2}>เบอร์ร้าน: {props.phone}</Box>
      </Box>
      <Box mt={2} display={"flex"} alignContent={"center"}>
        <Email />
        <Box ml={2}>อีเมล: {props.email}</Box>
      </Box>
    </>
  );
};

export default ContactBox;
