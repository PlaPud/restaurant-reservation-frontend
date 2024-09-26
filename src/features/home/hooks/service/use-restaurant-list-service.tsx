import React, { useEffect, useState } from "react";
import { IRestaurantListService } from "../../services/restaurant-list-service.interface";
import RestaurantList from "../../../../app/routes/app/restaurant-list";
import { RestaurantListMockService } from "../../services/restaurant-list-mock-service";
import { RestaurantListAxiosService } from "../../services/restaurant-list-axios-service";

const useRestaurantListService = () => {
  const [service, setService] = useState<IRestaurantListService>(
    new RestaurantListAxiosService()
  );

  return service;
};

export default useRestaurantListService;
