import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { IThaiAddressService } from "../services/address/thai-address-service.interface";
import { District, Province, SubDistrict } from "../shared/interface/address";

export interface ThaiAddressData {
  province: Province | null;
  district: District | null;
  subDistrict: SubDistrict | null;
}

const useSelectAddress = (service: IThaiAddressService) => {
  const [selectedAddress, setSelectedAddress] = useState<ThaiAddressData>({
    province: null,
    district: null,
    subDistrict: null,
  });

  const [preFetchedProvinces, setPreFetchProvinces] = useState<
    Province[] | null
  >(null);

  const [fetchedDistricts, setFetchDistricts] = useState<District[] | null>(
    null
  );

  const [fetchedSubDists, setFetchSubDists] = useState<SubDistrict[] | null>(
    null
  );

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await service.fetchAllProvince();
        setPreFetchProvinces(data);
      } catch (err) {
        console.error("Fetching Provinces Error", err);
        setPreFetchProvinces([]);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedAddress.province) {
        try {
          console.log(selectedAddress.province);

          const data = await service.fetchDistrictsByProvince(
            selectedAddress.province.id
          );
          setFetchDistricts(data);
        } catch (err) {
          console.error("Fetching Districts Error", err);
          setFetchDistricts([]);
        }
      } else {
        setFetchDistricts(null);
      }
    };

    fetchDistricts();
  }, [selectedAddress.province]);

  useEffect(() => {
    const fetchSubDistricts = async () => {
      if (selectedAddress.district) {
        try {
          const data = await service.fetchSubDistsByDistricts(
            selectedAddress.district.id
          );
          setFetchSubDists(data);
        } catch (err) {
          console.error("Fetching Sub-districts Error", err);
          setFetchDistricts([]);
        }
      } else {
        setFetchSubDists(null);
      }
    };

    fetchSubDistricts();
  }, [selectedAddress.district]);

  useEffect(() => {}, [selectedAddress.subDistrict]);

  const handleChangeProvince = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const province: Province = e.target.value as unknown as Province;
    if (province === selectedAddress.province) return;
    setSelectedAddress({ province, district: null, subDistrict: null });
  };

  const handleChangeDistrict = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const district: District = e.target.value as unknown as District;
    if (district === selectedAddress.district) return;
    setSelectedAddress({ ...selectedAddress, district, subDistrict: null });
  };

  const handleChangeSubDistrict = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const subDistrict: SubDistrict = e.target.value as unknown as SubDistrict;
    if (subDistrict === selectedAddress.subDistrict) return;
    setSelectedAddress({ ...selectedAddress, subDistrict });
    console.log(selectedAddress);
  };

  return {
    preFetchedProvinces,
    fetchedDistricts,
    fetchedSubDists,
    handleChangeProvince,
    handleChangeDistrict,
    handleChangeSubDistrict,
    selectedAddress,
  };
};

export default useSelectAddress;
