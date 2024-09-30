import { IRestaurantEditService } from "./restaurant-edit-service.interface";

export class RestaurantEditMockService implements IRestaurantEditService {
  fetchRestaurant(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  updateRestaurant(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
