import axios from "axios";
import { BACKEND_URL } from "../../../shared/constants";
import { ReservationPagedResponse } from "../../reservation-org/services/organize-reservation-service.interface";
import { IMyReservationsService } from "./my-reservations-service.interface";

export class MyReservationsAxiosService implements IMyReservationsService {
  public async fetchAllReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse> {
    const query = {
      page,
      searchQuery,
    };

    const response = await axios.get<ReservationPagedResponse>(
      `${BACKEND_URL}/reservations/all`,
      {
        withCredentials: true,
        params: query,
      }
    );

    return response.data;
  }
  public async fetchPendingReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse> {
    const query = {
      page,
      searchQuery,
    };

    const response = await axios.get<ReservationPagedResponse>(
      `${BACKEND_URL}/reservations/pending`,
      {
        withCredentials: true,
        params: query,
      }
    );

    return response.data;
  }
  public async fetchBookedReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse> {
    const query = {
      page,
      searchQuery,
    };

    const response = await axios.get<ReservationPagedResponse>(
      `${BACKEND_URL}/reservations/booked`,
      {
        withCredentials: true,
        params: query,
      }
    );

    return response.data;
  }
  public async fetchDoneReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse> {
    const query = {
      page,
      searchQuery,
    };

    const response = await axios.get<ReservationPagedResponse>(
      `${BACKEND_URL}/reservations/done`,
      {
        withCredentials: true,
        params: query,
      }
    );

    return response.data;
  }
}
