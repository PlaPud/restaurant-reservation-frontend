import axios from "axios";
import { ReservationResData } from "../../../shared/interface/user";
import { IMakeReservationService } from "./make-reservation-service.interface";
import { BACKEND_URL } from "../../../shared/constants";

export class MakeReservationAxiosService implements IMakeReservationService {
  public async fetchReservation(
    reserveId: string
  ): Promise<ReservationResData> {
    const query = {
      reserveId,
    };

    try {
      const result = await axios.get<ReservationResData>(
        `${BACKEND_URL}/reservations`,
        {
          params: query,
          withCredentials: true,
        }
      );

      return result.data;
    } catch (err) {
      throw new Error(`Cannot Fetch Data`);
    }
  }

  public async makeReservation(
    reserveId: string,
    paymentFile?: File
  ): Promise<ReservationResData> {
    const query = {
      reserveId: reserveId,
    };

    try {
      if (paymentFile) {
        console.log("has payment file");

        const imgFormData = new FormData();

        imgFormData.append("file", paymentFile);

        const uploadedPathData = await axios.patch(
          `${BACKEND_URL}/reservations/pay-url`,
          imgFormData,
          { params: query, withCredentials: true }
        );
      }

      console.log(query);

      const result = await axios.patch(
        `${BACKEND_URL}/reservations/make-reservation`,
        undefined,
        { params: query, withCredentials: true }
      );
      return result.data;
    } catch (err) {
      throw new Error(`Cannot Update Reservation Data`);
    }
  }
}
