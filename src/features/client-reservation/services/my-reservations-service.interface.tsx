import { ReservationResData } from "../../../shared/interface/user";
import {
  ReservationCreateData,
  ReservationPagedResponse,
} from "../../reservation-org/services/organize-reservation-service.interface";

export interface IMyReservationsService {
  fetchAllReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse>;

  fetchPendingReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse>;

  fetchBookedReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse>;

  fetchDoneReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse>;
}
