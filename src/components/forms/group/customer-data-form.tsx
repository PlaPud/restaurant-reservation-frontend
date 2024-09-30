import { Box, Grid2 as Grid } from "@mui/material";
import React from "react";
import { GeneralInputField } from "../general-form-field";
import PasswordInputField from "../password-input-field";

const CustomerDataForm = ({ onChange }) => {
  return (
    <>
      <Grid container mt={1} spacing={2}>
        <Grid size={6}>
          <GeneralInputField
            required={true}
            onChange={onChange}
            type={"text"}
            id={"fname-field"}
            name={"fName"}
            label={"ชื่อ"}
          />
        </Grid>
        <Grid size={6}>
          <GeneralInputField
            required={true}
            onChange={onChange}
            type={"text"}
            id={"lname-field"}
            name={"lName"}
            label={"นามสกุล"}
          />
        </Grid>
      </Grid>
      <Box mt={1}>
        <GeneralInputField
          required={true}
          type={"email"}
          onChange={onChange}
          id={"email-field"}
          name={"email"}
          label={"Email"}
        />
      </Box>
      <Box mt={1}>
        <PasswordInputField onChange={onChange} />
      </Box>
      <Box mt={1}>
        <GeneralInputField
          required={true}
          type={"text"}
          onChange={onChange}
          id={"phone-field"}
          name={"phone"}
          label={"เบอร์โทรศัพท์"}
        />
      </Box>
    </>
  );
};

export default CustomerDataForm;
