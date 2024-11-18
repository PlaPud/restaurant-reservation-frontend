import React, { useState } from "react";
import { IOrganizeReservationService } from "../../services/organize-reservation-service.interface";
import { OrganizeReservationMockService } from "../../services/organize-reservation-mock-service";
import { OrganizeReservationAxiosService } from "../../services/organize-reservation-axios-service";

const useOrganizeReserveService = () => {
  const [service, setService] = useState<IOrganizeReservationService>(
    new OrganizeReservationAxiosService()
  );

  return service;
};

export default useOrganizeReserveService;
