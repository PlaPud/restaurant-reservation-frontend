import { Box, Button, Container } from "@mui/material";
import React, { useEffect } from "react";
import { GeneralInputField } from "../../../components/forms/general-form-field";
import SelectFormField from "../../../components/forms/select-form-field";
import { ThaiAddressAxiosService } from "../../../services/address/thai-address-axios-service";
import useSearchForm from "../hooks/use-search-form";

const SearchForm = ({
  page,
  searchFormSubmit,
  onSearch,
  onQueryChange,
  onFilterChange,
  onSubmitForm,
}) => {
  const service = new ThaiAddressAxiosService();

  const {
    preFetchedProvinces,
    fetchedDistricts,
    fetchedSubDists,
    handleInputChange,
    handleChangeProvince,
    handleChangeDistrict,
    handleChangeSubDistrict,
    selectedAddress,
  } = useSearchForm(service, onQueryChange, onFilterChange);

  return (
    <Container>
      <Box mt={3}>
        <h3>ค้นหาร้าน</h3>
      </Box>
      <Box mt={3}>
        <GeneralInputField
          type={"text"}
          onChange={handleInputChange}
          id={"search-name-field"}
          name={"searchQuery"}
          label={"ชื่อร้านอาหาร"}
        />
      </Box>
      <Box mt={3}>
        <SelectFormField
          id={"search-province-sel"}
          label={"จังหวัด"}
          name={"province"}
          selectedValue={selectedAddress.province}
          items={preFetchedProvinces}
          onChange={handleChangeProvince}
        />
      </Box>
      <Box mt={3}>
        <SelectFormField
          id={"search-district-sel"}
          label={"อำเภอ/เขต"}
          name={"district"}
          selectedValue={selectedAddress.district}
          items={fetchedDistricts}
          onChange={handleChangeDistrict}
        />
      </Box>
      <Box mt={3}>
        <SelectFormField
          id={"search-sub-district-sel"}
          label={"ตำบล/แขวง"}
          name={"subDistrict"}
          selectedValue={selectedAddress.subDistrict}
          items={fetchedSubDists}
          onChange={handleChangeSubDistrict}
        />
      </Box>
      <Box mt={3}>
        <Button
          onClick={async () => {
            onSubmitForm();
            await onSearch(
              1,
              searchFormSubmit.searchQuery,
              searchFormSubmit.filter
            );
          }}
          variant="outlined"
          fullWidth
        >
          ค้นหา
        </Button>
      </Box>
    </Container>
  );
};

export default SearchForm;
