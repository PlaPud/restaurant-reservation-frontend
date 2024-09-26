import { IFilterRestaurant } from "../../../shared/interface/search";
import { RestaurantResData } from "../../../shared/interface/user";

export interface IRestaurantListService {
  fetchRestaurantList(page: number): Promise<any>;

  fetchRestaurantsWithFilter(
    page: number,
    searchQuery: string,
    filter: IFilterRestaurant
  ): Promise<any>;
}
