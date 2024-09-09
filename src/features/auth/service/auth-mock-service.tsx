import { Customer, Restaurant, UserLoginData } from "../../../shared/interface/user";
import { IAuthService } from "./auth-service.interface";

export class AuthMockService implements IAuthService {

  private _customerAccounts : Customer[] = [{
    customerid: "1",
    fName: "John",
    lName: "Doe",
    email: "john.d@mail.com",
    phone: "123456890",
    currentReserves: [],
  }]
  
  private _restaurantAccounts : Restaurant[] = [{
    restaurantId: "1",
    name: "Papa John",
    address: "123 Sample St., NYC",
    email: "papa.j@mail.com",
    phone: "1112223334",
    reservations: []
  }]

  public constructor() {}
  
  
  public async loginCustomer(formData: UserLoginData): Promise<void> {
    const account = this._customerAccounts.find((c) => c.email === formData.email)
    
    if (!account) {
      console.log('No Account Exist!')
      return
    }
    
    console.log('Login Successfully!')
    
  }
  public async registerCustomer(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  public async loginRestaurant(formData: UserLoginData): Promise<void> {
    const account = this._restaurantAccounts.find((rs) => rs.email === formData.email)
    
    if (!account) {
      console.log('No Account Exist!')
      return
    }
    
    console.log('Login Successfully!')
  }
  
  public async registerRestaurant(): Promise<void> {
    throw new Error("Method not implemented.");
    
  }
  public async logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}