import axios from "axios";
import { BACKEND_URL } from "../../shared/constants";
import {
  CustomerResData,
  RestaurantResData,
} from "../../shared/interface/user";
import { IUserService } from "./user-service.interface";
import { TokenRole } from "../../shared/enum/role";
import { UserData } from "../../contexts/auth/auth-context";

export class UserAxiosService implements IUserService {
  public async fetchUserCustomer(): Promise<CustomerResData> {
    try {
      const result = await axios.get<CustomerResData>(
        `${BACKEND_URL}/customers/me`,
        {
          withCredentials: true,
        }
      );
      return result.data as CustomerResData;
    } catch (err) {
      throw new Error(`Cannot find account as customer from this credential.`);
    }
  }

  public async fetchUserRestaurant(): Promise<RestaurantResData> {
    try {
      const result = await axios.get<RestaurantResData>(
        `${BACKEND_URL}/restaurants/me`,
        {
          withCredentials: true,
        }
      );
      return result.data as RestaurantResData;
    } catch (err) {
      throw new Error(`Cannot find account as customer from this credential.`);
    }
  }

  public async fetchUserData(): Promise<UserData> {
    try {
      const result = await axios.get<UserData>(`${BACKEND_URL}/user/data`, {
        withCredentials: true,
      });
      return result.data as UserData;
    } catch (err) {
      throw new Error(`Fetching user data failed. now accessing as guest.`);
    }
  }
}
