import { Box, Grid2 as Grid } from "@mui/material";
import React, { useEffect } from "react";
import { GeneralInputField } from "../general-form-field";
import SelectFormField from "../select-form-field";
import PasswordInputField from "../password-input-field";
import { RestaurantEditData } from "../../../features/restaurant-edit/hooks/use-rest-edit-form";
import {
  District,
  Province,
  SubDistrict,
} from "../../../shared/interface/address";

const RestaurantDataForm = ({
  onChange,
  subDistrictItems,
  districtItems,
  provinceItems,
  onChangeSubDistrict,
  onChangeDistrict,
  onChangeProvince,
  selectedAddressItems,
  data = {} as RestaurantEditData,
  includePassword = true,
}) => {
  return (
    <>
      <Box mt={1}>
        <GeneralInputField
          filledValue={data ? data.name : ""}
          required={true}
          onChange={onChange}
          type={"text"}
          id={"name-field"}
          name={"name"}
          label={"ชื่อร้าน"}
        />
      </Box>
      <Box mt={1}>
        <GeneralInputField
          filledValue={data ? data.address : ""}
          required={true}
          type={"text"}
          onChange={onChange}
          id={"address-field"}
          name={"address"}
          label={"ที่ตั้งร้านเลขที่"}
        />
      </Box>
      <Grid mt={2} mb={2} spacing={1} container>
        <Grid size={{ xs: 12, md: 4 }}>
          <SelectFormField
            id="province-field"
            label="จังหวัด"
            name="province"
            selectedValue={selectedAddressItems.province ?? ""}
            items={provinceItems ?? []}
            onChange={(e) => {
              onChangeProvince(e);
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SelectFormField
            id="district-field"
            label="อำเภอ/แขวง"
            name="district"
            selectedValue={selectedAddressItems.district ?? ""}
            items={districtItems}
            onChange={(e) => {
              onChangeDistrict(e);
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SelectFormField
            id="sub-district-field"
            label="ตำบล/เขต"
            name="subDistrict"
            selectedValue={selectedAddressItems.subDistrict ?? ""}
            items={subDistrictItems}
            onChange={(e) => {
              onChangeSubDistrict(e);
            }}
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

export default RestaurantDataForm;
