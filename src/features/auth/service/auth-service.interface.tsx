import { UserLoginData } from "../../../shared/interface/user"

export interface IAuthService {

  loginCustomer(formData: UserLoginData): Promise<void>
  registerCustomer(): Promise<void>

  loginRestaurant(formData: UserLoginData): Promise<void>
  registerRestaurant(): Promise<void>

  logout(): Promise<void>

}