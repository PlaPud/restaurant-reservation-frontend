export interface UserLoginReqBody {
  email: string;
  password: string;
}

export interface CustomerResData {
  customerId: string;
  fName: string;
  lName: string;
  email: string;
  phone: string;
  profileImgPath: string;
  reservations?: ReservationResData[];
}

export interface ReservationResData {
  reserveId: string;
  customerId: string | null;
  customer: CustomerResData | null;
  restaurantId: string;
  restaurant: RestaurantResData;
  lastModified: number | null;
  seats: number;
  reservePrice: number;
  reserveDate: number;
  payImgUrl: string;
  isPayed: boolean;
  isAttended: boolean;
}

export interface RestaurantResData {
  restaurantId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  subDistrict: string;
  district: string;
  province: string;
  profileImgPath: string;
  description: string;
  paymentInfo: string;
  reservation?: ReservationResData[];
}
