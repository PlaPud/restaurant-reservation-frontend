import axios from "axios";
import { IFilterRestaurant } from "../../../shared/interface/search";
import { RestaurantResData } from "../../../shared/interface/user";
import { IRestaurantListService } from "./restaurant-list-service.interface";
import { BACKEND_URL } from "../../../shared/constants";

export class RestaurantListAxiosService implements IRestaurantListService {
  public async fetchRestaurantList(page: number): Promise<any> {
    const res = await axios.get(`${BACKEND_URL}/restaurants/all`, {
      withCredentials: true,
      data: {
        page: page,
      },
    });

    return {
      totalPages: res.data.totalPages,
      data: res.data.data
        ? res.data.data.map((r) => r as RestaurantResData)
        : [],
    };
  }

  public async fetchRestaurantsWithFilter(
    page: number,
    searchQuery: string,
    filter: IFilterRestaurant
  ): Promise<any> {
    const res = await axios.get(`${BACKEND_URL}/restaurants/all`, {
      withCredentials: true,
      params: {
        page: page,
        searchQuery: searchQuery as string,
        filterBy: JSON.stringify(filter),
      },
    });

    return res.data
      ? {
          totalPages: res.data.totalPages,
          data: res.data.data.map((r) => r as RestaurantResData),
        }
      : {
          totalPages: 1,
          data: [],
        };
  }
}
