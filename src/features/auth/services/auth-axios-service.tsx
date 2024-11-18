import axios from "axios";
import { UserLoginReqBody } from "../../../shared/interface/user";
import { IAuthService } from "./auth-service.interface";
import { BACKEND_URL } from "../../../shared/constants";
import { UserRegisterData } from "../hooks/use-regis-form";

export class AuthAxiosService implements IAuthService {
  public constructor() {}

  public async loginCustomer(formData: UserLoginReqBody): Promise<void> {
    const res = await axios.post(`${BACKEND_URL}/customers/login`, formData, {
      withCredentials: true,
    });
  }
  public async registerCustomer(formData: UserRegisterData): Promise<void> {
    const res = await axios.post(`${BACKEND_URL}/customers`, formData);
  }
  public async loginRestaurant(formData: UserLoginReqBody): Promise<void> {
    const res = await axios.post(`${BACKEND_URL}/restaurants/login`, formData, {
      withCredentials: true,
    });
  }
  public async registerRestaurant(formData: UserRegisterData): Promise<void> {
    const res = await axios.post(`${BACKEND_URL}/restaurants`, formData);
  }
  public async logout(): Promise<void> {
    const res = await axios.post(`${BACKEND_URL}/logout`, undefined, {
      withCredentials: true,
    });
  }
}
