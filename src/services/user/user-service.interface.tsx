import { TokenRole } from "../../shared/enum/role";
import {
  CustomerResData,
  RestaurantResData,
} from "../../shared/interface/user";

export interface IUserService {
  fetchUserCustomer(): Promise<CustomerResData>;
  fetchUserRestaurant(): Promise<RestaurantResData>;
  fetchRole(): Promise<TokenRole>;
}
