import React, { ChangeEvent, useEffect, useState } from "react";
import { IFilterRestaurant } from "../../../shared/interface/search";
import { IThaiAddressService } from "../../../services/address/thai-address-service.interface";
import useSelectAddress from "../../../hooks/use-select-address";

const useSearchForm = (
  service: IThaiAddressService,
  onQueryChange,
  onFilterChange
) => {
  const {
    preFetchedProvinces,
    fetchedDistricts,
    fetchedSubDists,
    handleChangeProvince,
    handleChangeDistrict,
    handleChangeSubDistrict,
    selectedAddress,
  } = useSelectAddress(service);

  useEffect(() => {
    if (
      !selectedAddress.province &&
      !selectedAddress.district &&
      !selectedAddress.subDistrict
    )
      return;

    const addressNameTH = {
      province: selectedAddress.province
        ? selectedAddress.province.name_th
        : "",
      district: selectedAddress.district
        ? selectedAddress.district.name_th
        : "",
      subDistrict: selectedAddress.subDistrict
        ? selectedAddress.subDistrict.name_th
        : "",
    };

    const filter: IFilterRestaurant = {
      province: addressNameTH.province,
      district: addressNameTH.district,
      subDistrict: addressNameTH.subDistrict,
    };

    onFilterChange(filter);
    // setSearchForm({ ...searchForm, filter });
  }, [selectedAddress]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    const { name, value } = e.target;

    // console.log(name, value);

    onQueryChange(name, value);
  };

  return {
    // searchForm,
    // searchFormSubmit,
    preFetchedProvinces,
    fetchedDistricts,
    fetchedSubDists,
    handleInputChange,
    handleChangeProvince,
    handleChangeDistrict,
    handleChangeSubDistrict,
    // handleSubmitSearchForm,
    selectedAddress,
  };
};

export default useSearchForm;
