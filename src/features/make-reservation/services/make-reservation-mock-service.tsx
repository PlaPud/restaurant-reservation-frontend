import { MAX_IMG_FILE_SIZE } from "../../../shared/constants";
import { ReservationResData } from "../../../shared/interface/user";
import {
  delay,
  getMockReservationData,
} from "../../../shared/utils/mock-utils";
import { IMakeReservationService } from "./make-reservation-service.interface";

export class MakeReservationMockService implements IMakeReservationService {
  public async fetchReservation(
    reserveId: string
  ): Promise<ReservationResData> {
    await delay(750);
    return getMockReservationData();
  }

  public async makeReservation(
    reserveId: string,
    paymentFile?: File
  ): Promise<ReservationResData> {
    await delay(500);

    if (!paymentFile) return getMockReservationData();

    if (paymentFile.size > MAX_IMG_FILE_SIZE) {
      return getMockReservationData();
    }
    return getMockReservationData();
  }
}
