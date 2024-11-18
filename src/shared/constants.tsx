import { addHours, roundToNearestHours } from "date-fns";
import { ReservationFormData } from "../features/reservation-org/components/create-reserve-modal";
import { TokenRole } from "./enum/role";
import restaurant_default from "../assets/restaurant/restaurant-placeholder.png";
import customer_default from "../assets/customer/blank-profile-picture.png";

export const RESTAURANT_PLACEHOLDER_IMG = restaurant_default;
export const CUSTOMER_PLACEHOLDER_IMG = customer_default;

export const MAX_IMG_FILE_SIZE = 1 * 1024 * 1024;
export const PAGE_SIZE = 10;
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const DEFAULT_FORM_RESERVE: ReservationFormData = {
  seats: 0,
  reserveDate: Number(addHours(roundToNearestHours(Date.now()), 1)),
  reservePrice: 0,
};

export const LOGGED_IN_ROLES = [
  TokenRole.Admin,
  TokenRole.Customer,
  TokenRole.Restaurant,
];

export const GUEST_ROLE_ONLY = [null];
export const CUSTOMER_ROLE_ONLY = [TokenRole.Customer];
export const RESTAURANT_ROLE_ONLY = [TokenRole.Restaurant];
export const MAIN_ACTOR_ROLES = [TokenRole.Customer, TokenRole.Restaurant];
