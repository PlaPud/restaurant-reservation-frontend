import { RestaurantResData } from "../../../shared/interface/user";

export interface IRestaurantPageService {
  fetchRestaurant(id: string): Promise<RestaurantResData>;
}
