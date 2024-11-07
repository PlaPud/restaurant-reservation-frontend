import { UserData } from "../../contexts/auth/auth-context";
import { TokenRole } from "../../shared/enum/role";
import {
  CustomerResData,
  RestaurantResData,
} from "../../shared/interface/user";
import {
  delay,
  getMockCustomerData,
  getMockRestaurantData,
} from "../../shared/utils/mock-utils";
import { IUserService } from "./user-service.interface";

export class UserMockService implements IUserService {
  public async fetchUserCustomer(): Promise<CustomerResData> {
    await delay(200);
    return getMockCustomerData();
  }
  public async fetchUserRestaurant(): Promise<RestaurantResData> {
    await delay(200);
    return getMockRestaurantData();
  }
  public async fetchUserData(): Promise<UserData> {
    throw new Error("Method not implemented.");
  }
}
