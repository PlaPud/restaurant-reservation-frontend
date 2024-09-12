import { UserLoginData } from "../../../shared/interface/user"
import { CustomerRegisData, RestaurantRegisData } from "../hooks/use-regis-form"

export interface IAuthService {

  loginCustomer(formData: UserLoginData): Promise<void>
  registerCustomer(formData: CustomerRegisData): Promise<void>

  loginRestaurant(formData: UserLoginData): Promise<void>
  registerRestaurant(formData: RestaurantRegisData): Promise<void>

  logout(): Promise<void>

}