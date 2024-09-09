
export interface UserLoginData {
  email: string;
  password: string;
}

export interface Customer {
  customerId: string;
  fName: string;
  lName: string;
  email: string;
  phone: string;
  currentReserves: Reservation[] 
}

export interface Reservation {

}

export interface Restaurant {
  restaurantId: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  reservations: Reservation[]
}