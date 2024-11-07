import { UserData } from "../../contexts/auth/auth-context";
import { TokenRole } from "../../shared/enum/role";
import {
  CustomerResData,
  RestaurantResData,
} from "../../shared/interface/user";

export interface IUserService {
  fetchUserCustomer(): Promise<CustomerResData>;
  fetchUserRestaurant(): Promise<RestaurantResData>;
  fetchUserData(): Promise<UserData>;
}
