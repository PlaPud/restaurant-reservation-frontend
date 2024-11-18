import React, { useState } from "react";
import { IMakeReservationService } from "../../services/make-reservation-service.interface";
import { MakeReservationMockService } from "../../services/make-reservation-mock-service";
import { MakeReservationAxiosService } from "../../services/make-reservation-axios-service";

const useMakeReservationService = () => {
  const [service, setService] = useState<IMakeReservationService>(
    new MakeReservationAxiosService()
  );

  return service;
};

export default useMakeReservationService;
