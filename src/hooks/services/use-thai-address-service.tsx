import React, { useState } from "react";
import { ThaiAddressAxiosService } from "../../services/address/thai-address-axios-service";
import { IThaiAddressService } from "../../services/address/thai-address-service.interface";

const useThaiAddressService = () => {
  const [service, setService] = useState<IThaiAddressService>(
    new ThaiAddressAxiosService()
  );
  return service;
};

export default useThaiAddressService;
