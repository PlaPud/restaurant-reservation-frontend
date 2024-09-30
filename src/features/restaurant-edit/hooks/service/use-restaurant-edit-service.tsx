import React, { useState } from "react";
import { IRestaurantEditService } from "../../services/restaurant-edit-service.interface";
import { RestaurantEditAxiosService } from "../../services/restaurant-edit-axios-service";

const useRestaurantEditService = () => {
  const [service, setService] = useState<IRestaurantEditService>(
    new RestaurantEditAxiosService()
  );
  return service;
};

export default useRestaurantEditService;
