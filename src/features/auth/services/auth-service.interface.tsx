import { UserLoginReqBody } from "../../../shared/interface/user";
import {
  CustomerRegisData,
  RestaurantRegisData,
} from "../hooks/use-regis-form";

export interface IAuthService {
  loginCustomer(formData: UserLoginReqBody): Promise<void>;
  registerCustomer(formData: CustomerRegisData): Promise<void>;

  loginRestaurant(formData: UserLoginReqBody): Promise<void>;
  registerRestaurant(formData: RestaurantRegisData): Promise<void>;

  logout(): Promise<void>;
}
