import { ReservationResData } from "../../../shared/interface/user";

export interface ReservationPagedResponse {
  totalPages: number;
  data: ReservationResData[];
}

export interface ReservationCreateData {
  seats: number;
  reservePrice: number;
  reserveDate: number;
}

export interface IOrganizeReservationService {
  fetchAllReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse>;

  fetchAvailableReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse>;

  fetchPendingReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse>;

  fetchSuccessReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse>;

  fetchDoneReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse>;

  createReservation(body: ReservationCreateData): Promise<ReservationResData>;

  editReservation(
    id: string,
    body: ReservationCreateData
  ): Promise<ReservationResData>;

  deleteReservation(id: string): Promise<void>;

  approveReservation(id: string): Promise<ReservationResData>;

  checkAttendReservation(id: string): Promise<ReservationResData>;

  cancelReservation(id: string): Promise<ReservationResData>;

  // editReservationDetail(body: ReservationEditData): Promise<ReservationResData>;
}
