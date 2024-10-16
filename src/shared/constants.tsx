import { addHours, roundToNearestHours } from "date-fns";
import { ReservationFormData } from "../features/reservation-org/components/create-reserve-modal";

export const PAGE_SIZE = 10;
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const DEFAULT_FORM_RESERVE: ReservationFormData = {
  seats: 0,
  reserveDate: Number(addHours(roundToNearestHours(Date.now()), 1)),
  reservePrice: 0,
};
