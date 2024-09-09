import { UserLoginData } from "../../../shared/interface/user";
import { IAuthService } from "./auth-service.interface";

export class AuthAxiosService implements IAuthService {
  public async loginCustomer(formData: UserLoginData): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async registerCustomer(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async loginRestaurant(formData: UserLoginData): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async registerRestaurant(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }

}