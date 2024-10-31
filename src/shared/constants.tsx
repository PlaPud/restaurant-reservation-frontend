import { addHours, roundToNearestHours } from "date-fns";
import { ReservationFormData } from "../features/reservation-org/components/create-reserve-modal";

export const MAX_IMG_FILE_SIZE = 1 * 1024 * 1024;
export const PAGE_SIZE = 10;
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const DEFAULT_FORM_RESERVE: ReservationFormData = {
  seats: 0,
  reserveDate: Number(addHours(roundToNearestHours(Date.now()), 1)),
  reservePrice: 0,
};
