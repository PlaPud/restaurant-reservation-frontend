import { RestaurantEditData } from "../hooks/use-rest-edit-form";

export interface IRestaurantEditService {
  fetchRestaurant(): Promise<any>;

  updateRestaurant(body: RestaurantEditData, imgFile?: File): Promise<any>;

  deleteProfileImg(): Promise<any>;
}
