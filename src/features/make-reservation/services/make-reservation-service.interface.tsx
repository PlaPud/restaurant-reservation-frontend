import { ReservationResData } from "../../../shared/interface/user";

export interface IMakeReservationService {
  fetchReservation(reserveId: string): Promise<ReservationResData>;
  makeReservation(
    reserveId: string,
    paymentFile?: File
  ): Promise<ReservationResData>;
}
