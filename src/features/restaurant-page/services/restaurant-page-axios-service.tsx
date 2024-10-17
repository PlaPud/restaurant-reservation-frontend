import axios from "axios";
import { RestaurantResData } from "../../../shared/interface/user";
import { IRestaurantPageService } from "./restaurant-page-service.interface";
import { BACKEND_URL } from "../../../shared/constants";

export class RestaurantPageAxiosService implements IRestaurantPageService {
  public async fetchRestaurant(id: string): Promise<RestaurantResData> {
    const result = await axios.get<RestaurantResData>(
      `${BACKEND_URL}/restaurants`,
      {
        withCredentials: true,
        params: {
          restaurantId: id,
        },
      }
    );

    console.log(result.data);
    return result.data;
  }
}
