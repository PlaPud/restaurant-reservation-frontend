import { RestaurantResData } from "../../../shared/interface/user";
import {
  delay,
  getMockReservationData,
  getMockRestaurantData,
} from "../../../shared/utils/mock-utils";
import { IRestaurantPageService } from "./restaurant-page-service.interface";

export class RestaurantPageMockService implements IRestaurantPageService {
  public constructor() {}

  public async fetchRestaurant(id: string): Promise<RestaurantResData> {
    await delay(1500);
    const result = getMockRestaurantData(
      Array.from({ length: 10 }, getMockReservationData)
    );

    return result;
  }
}
