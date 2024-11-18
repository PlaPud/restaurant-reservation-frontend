import { isPast } from "date-fns";
import { ReservationResData } from "../../../shared/interface/user";
import {
  delay,
  getMockReservationData,
  getReserveCutOffTimeSeconds,
  isReserveCutOff,
} from "../../../shared/utils/mock-utils";
import { ReservationPagedResponse } from "../../reservation-org/services/organize-reservation-service.interface";
import { IMyReservationsService } from "./my-reservations-service.interface";

export class MyReservationsMockService implements IMyReservationsService {
  private readonly _reservations = {
    1: Array.from({ length: 10 }, () => getMockReservationData(true)),
    2: Array.from({ length: 10 }, () => getMockReservationData(true)),
    3: Array.from({ length: 10 }, () => getMockReservationData(true)),
    4: Array.from({ length: 4 }, () => getMockReservationData(true)),
  };

  public async fetchAllReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse> {
    if (!this._reservations[page]) throw new Error("Cannot find page.");
    await delay(2000);

    const filteredData = this._reservations[page].filter(
      (rs: ReservationResData) =>
        !isReserveCutOff(rs.reserveDate) &&
        rs.restaurant.name.includes(searchQuery)
    );

    return {
      totalPages: 4,
      data: filteredData,
    };
  }

  public async fetchPendingReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse> {
    if (!this._reservations[page]) throw new Error("Cannot find page.");
    await delay(2000);

    const filteredData = this._reservations[page].filter(
      (rs: ReservationResData) =>
        !isReserveCutOff(rs.reserveDate) &&
        rs.restaurant.name.includes(searchQuery) &&
        !rs.isPayed
    );

    return {
      totalPages: 4,
      data: filteredData,
    };
  }

  public async fetchBookedReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse> {
    if (!this._reservations[page]) throw new Error("Cannot find page.");
    await delay(2000);

    const filteredData = this._reservations[page].filter(
      (rs: ReservationResData) =>
        !isReserveCutOff(rs.reserveDate) &&
        rs.restaurant.name.includes(searchQuery) &&
        rs.isPayed &&
        !rs.isAttended
    );

    return {
      totalPages: 4,
      data: filteredData,
    };
  }

  public async fetchDoneReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse> {
    if (!this._reservations[page]) throw new Error("Cannot find page.");
    await delay(2000);

    const filteredData = this._reservations[page].filter(
      (rs: ReservationResData) =>
        rs.restaurant.name.includes(searchQuery) &&
        (rs.isAttended || isReserveCutOff(rs.reserveDate))
    );

    return {
      totalPages: 4,
      data: filteredData,
    };
  }
}
