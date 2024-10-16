import {
  CustomerResData,
  RestaurantResData,
  UserLoginReqBody,
} from "../../../shared/interface/user";
import { delay } from "../../../shared/utils/mock-utils";
import {
  CustomerRegisData,
  RestaurantRegisData,
} from "../hooks/use-regis-form";
import { IAuthService } from "./auth-service.interface";

export class AuthMockService implements IAuthService {
  private _customerAccounts: CustomerResData[] = [
    {
      customerId: "1",
      fName: "John",
      lName: "Doe",
      email: "john.d@mail.com",
      phone: "123456890",
      reservations: [],
      profileImgPath: "",
    },
  ];

  private _restaurantAccounts: RestaurantResData[] = [
    {
      restaurantId: "1",
      name: "Papa John",
      address: "123 Sample St., NYC",
      email: "papa.j@mail.com",
      phone: "1112223334",
      reservations: [],
      subDistrict: "",
      district: "",
      province: "",
      profileimgPath: "",
      description: "",
    },
  ];

  public constructor() {}

  public async loginCustomer(formData: UserLoginReqBody): Promise<void> {
    const account = this._customerAccounts.find(
      (c) => c.email === formData.email
    );

    await delay(2000);

    if (!account) {
      console.log("No Account Exist!");
      return;
    }

    console.log("Login Successfully!");
  }
  public async registerCustomer(formData: CustomerRegisData): Promise<void> {
    const topIdx = this._customerAccounts.length - 1;

    const newCustomer: CustomerResData = {
      customerId: String(topIdx + 1),
      ...formData,
      reservations: [],
      profileImgPath: "",
    };

    await delay(2000);

    this._customerAccounts.push(newCustomer);

    console.log("registration complete!");
    console.log(newCustomer);
  }

  public async loginRestaurant(formData: UserLoginReqBody): Promise<void> {
    const account = this._restaurantAccounts.find(
      (rs) => rs.email === formData.email
    );

    await delay(2000);

    if (!account) {
      console.log("No Account Exist!");
      return;
    }

    console.log("Login Successfully!");
  }

  public async registerRestaurant(
    formData: RestaurantRegisData
  ): Promise<void> {
    const topIdx = this._restaurantAccounts.length - 1;

    const newRestaurant: RestaurantResData = {
      restaurantId: String(topIdx + 1),
      ...formData,
      reservations: [],
      profileimgPath: "",
      description: "",
    };

    await delay(2000);

    this._restaurantAccounts.push(newRestaurant);

    console.log("registration complete!");
    console.log(newRestaurant);
  }
  public async logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
