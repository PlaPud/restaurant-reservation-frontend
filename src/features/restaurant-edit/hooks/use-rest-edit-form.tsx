import React, { ChangeEvent, useEffect, useState } from "react";
import { IThaiAddressService } from "../../../services/address/thai-address-service.interface";
import useSelectAddress from "../../../hooks/use-select-address";
import {
  District,
  Province,
  SubDistrict,
} from "../../../shared/interface/address";
import { IRestaurantEditService } from "../services/restaurant-edit-service.interface";
import useToggle from "../../../hooks/use-toggle";
import { IUserService } from "../../../services/user/user-service.interface";

export interface RestaurantEditData {
  name: string;
  address: string;
  email: string;
  phone: string;
  subDistrict: string;
  district: string;
  province: string;
  description: string;
  paymentInfo: string;
}

const useRestEditForm = (
  userService: IUserService,
  // service: IRestaurantEditService,
  addressService: IThaiAddressService,
  defaultForm?: RestaurantEditData
) => {
  const { toggle: isLoading, handleToggle: toggleLoading } = useToggle(true);

  const [formData, setFormData] = useState<RestaurantEditData | null>(
    defaultForm
  );

  const [originalData, setOriginalData] = useState<RestaurantEditData | null>(
    null
  );

  const [imgPath, setImgPath] = useState("");

  const {
    preFetchedProvinces,
    fetchedDistricts,
    fetchedSubDists,
    handleChangeProvince,
    handleChangeDistrict,
    handleChangeSubDistrict,
    selectedAddress,
    setSelectedAddress,
  } = useSelectAddress(addressService);

  useEffect(() => {
    const addressNameTH = {
      province: selectedAddress.province
        ? selectedAddress.province.name_th
        : formData
        ? formData.province
        : "",
      district: selectedAddress.district
        ? selectedAddress.district.name_th
        : formData
        ? formData.district
        : "",
      subDistrict: selectedAddress.subDistrict
        ? selectedAddress.subDistrict.name_th
        : formData
        ? formData.subDistrict
        : "",
    };

    setFormData({ ...formData, ...addressNameTH });
  }, [selectedAddress]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isLoading) toggleLoading();
        const data = await userService.fetchUserRestaurant();
        setOriginalData({
          name: data.name,
          address: data.address,
          phone: data.phone,
          email: data.email,
          subDistrict: data.subDistrict,
          district: data.district,
          province: data.province,
          description: data.description,
          paymentInfo: data.paymentInfo,
        });
        setFormData({
          name: data.name,
          address: data.address,
          phone: data.phone,
          email: data.email,
          subDistrict: data.subDistrict,
          district: data.district,
          province: data.province,
          description: data.description,
          paymentInfo: data.paymentInfo,
        });
        setImgPath(data.profileImgPath);
      } catch (err) {
        setFormData(null);
      } finally {
        toggleLoading();
      }
    };

    fetchData();
  }, []);

  const clearFormFields = () => {
    setFormData(null);
  };

  const handleTextInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return {
    originalData,
    formData,
    imgPath,
    preFetchedProvinces,
    fetchedDistricts,
    fetchedSubDists,
    selectedAddress,
    setSelectedAddress,

    handleTextInputChange,
    handleChangeProvince,
    handleChangeDistrict,
    handleChangeSubDistrict,
    clearFormFields,
  };
};

export default useRestEditForm;
