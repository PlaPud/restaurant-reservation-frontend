import { Box, Grid2 as Grid } from "@mui/material";
import React, { useEffect } from "react";
import { GeneralInputField } from "../general-form-field";
import PasswordInputField from "../password-input-field";
import { CustomerEditData } from "../../../features/profile/hooks/use-my-profile";

const CustomerDataForm = ({
  onChange,
  data = {} as CustomerEditData,
  includePassword = true,
}) => {
  return (
    <>
      <Grid container mt={1} spacing={2}>
        <Grid size={6}>
          <GeneralInputField
            filledValue={data ? data.fName : ""}
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
            filledValue={data ? data.lName : ""}
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
          filledValue={data ? data.email : ""}
          required={true}
          type={"email"}
          onChange={onChange}
          id={"email-field"}
          name={"email"}
          label={"Email"}
        />
      </Box>
      {includePassword && (
        <Box mt={1}>
          <PasswordInputField onChange={onChange} />
        </Box>
      )}
      <Box mt={1}>
        <GeneralInputField
          filledValue={data ? data.phone : ""}
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
