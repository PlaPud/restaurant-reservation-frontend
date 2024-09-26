import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { UserLoginReqBody } from "../../../shared/interface/user";
import useSelectAddress from "../../../hooks/use-select-address";
import { ThaiAddressAxiosService } from "../../../services/address/thai-address-axios-service";

export interface CustomerRegisData extends UserLoginReqBody {
  fName: string;
  lName: string;
  phone: string;
}

export interface RestaurantRegisData extends UserLoginReqBody {
  name: string;
  address: string;
  phone: string;
  subDistrict: string;
  district: string;
  province: string;
}

export type UserRegisterData = CustomerRegisData | RestaurantRegisData;

const useRegisForm = <T extends CustomerRegisData | RestaurantRegisData>(
  service: ThaiAddressAxiosService,
  defaultForm?: T
) => {
  const [formData, setFormData] = useState<null | T>(defaultForm);

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

    // console.log(addressNameTH);
    setFormData({ ...formData, ...addressNameTH });
  }, [selectedAddress]);

  const clearFormFields = () => {
    setFormData(null);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    const { name, value } = e.target;

    console.log(name, value);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return {
    formData,
    selectedAddress,
    preFetchedProvinces,
    fetchedDistricts,
    fetchedSubDists,
    handleInputChange,
    handleChangeProvince,
    handleChangeDistrict,
    handleChangeSubDistrict,
    handleSubmit,
    clearFormFields,
  };
};

export default useRegisForm;
