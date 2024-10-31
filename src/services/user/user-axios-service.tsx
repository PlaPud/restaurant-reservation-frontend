import axios from "axios";
import { BACKEND_URL } from "../../shared/constants";
import {
  CustomerResData,
  RestaurantResData,
} from "../../shared/interface/user";
import { IUserService } from "./user-service.interface";
import { TokenRole } from "../../shared/enum/role";

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

  public async fetchRole(): Promise<TokenRole> {
    throw new Error("Method not implemented.");
  }
}
