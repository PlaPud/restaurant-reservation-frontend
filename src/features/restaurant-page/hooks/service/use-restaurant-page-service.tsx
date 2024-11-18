import React, { useState } from "react";
import { IRestaurantPageService } from "../../services/restaurant-page-service.interface";
import { RestaurantPageMockService } from "../../services/restaurant-page-mock-service";
import { RestaurantPageAxiosService } from "../../services/restaurant-page-axios-service";

const useRestaurantPageService = () => {
  const [service, setService] = useState<IRestaurantPageService>(
    new RestaurantPageAxiosService()
  );

  return service;
};

export default useRestaurantPageService;
