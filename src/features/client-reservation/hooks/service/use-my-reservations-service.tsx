import React, { useState } from "react";
import { IMyReservationsService } from "../../services/my-reservations-service.interface";
import { MyReservationsMockService } from "../../services/my-reservations-mock-service";
import { MyReservationsAxiosService } from "../../services/my-reservations-axios-service";

const useMyReservationsService = () => {
  const [service, setService] = useState<IMyReservationsService>(
    new MyReservationsAxiosService()
  );
  return service;
};

export default useMyReservationsService;
