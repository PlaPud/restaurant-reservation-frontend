import axios from "axios";
import { ReservationResData } from "../../../shared/interface/user";
import {
  IOrganizeReservationService,
  ReservationCreateData,
  ReservationPagedResponse,
} from "./organize-reservation-service.interface";
import { BACKEND_URL } from "../../../shared/constants";

export class OrganizeReservationAxiosService
  implements IOrganizeReservationService
{
  public constructor() {}

  public async fetchAllReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse> {
    try {
      const query = {
        page: page ?? 1,
        searchQuery: searchQuery ?? "",
      };

      const result = await axios.get<ReservationPagedResponse>(
        `${BACKEND_URL}/reservations/all`,
        {
          withCredentials: true,
          params: query,
        }
      );

      return result.data;
    } catch (err) {
      console.error(err);
    }
  }

  public async fetchAvailableReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse> {
    try {
      const query = {
        page: page ?? 1,
        searchQuery: searchQuery ?? "",
      };

      const result = await axios.get<ReservationPagedResponse>(
        `${BACKEND_URL}/reservations/avail`,
        {
          withCredentials: true,
          params: query,
        }
      );

      return result.data;
    } catch (err) {
      console.error(err);
    }
  }

  public async fetchPendingReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse> {
    try {
      const query = {
        page: page ?? 1,
        searchQuery: searchQuery ?? "",
      };

      const result = await axios.get<ReservationPagedResponse>(
        `${BACKEND_URL}/reservations/pending`,
        {
          withCredentials: true,
          params: query,
        }
      );

      return result.data;
    } catch (err) {
      console.error(err);
    }
  }

  public async fetchSuccessReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse> {
    try {
      const query = {
        page: page ?? 1,
        searchQuery: searchQuery ?? "",
      };

      const result = await axios.get<ReservationPagedResponse>(
        `${BACKEND_URL}/reservations/booked`,
        {
          withCredentials: true,
          params: query,
        }
      );

      return result.data;
    } catch (err) {
      console.error(err);
    }
  }

  public async fetchDoneReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse> {
    try {
      const query = {
        page: page ?? 1,
        searchQuery: searchQuery ?? "",
      };

      const result = await axios.get<ReservationPagedResponse>(
        `${BACKEND_URL}/reservations/done`,
        {
          withCredentials: true,
          params: query,
        }
      );

      return result.data;
    } catch (err) {
      console.error(err);
    }
  }

  public async createReservation(
    body: ReservationCreateData
  ): Promise<ReservationResData> {
    try {
      const result = await axios.post<ReservationResData>(
        `${BACKEND_URL}/reservations`,
        body,
        {
          withCredentials: true,
        }
      );

      return result.data;
    } catch (err) {
      console.error(err);
    }
  }

  public async editReservation(
    id: string,
    body: ReservationCreateData
  ): Promise<ReservationResData> {
    try {
      const query = {
        reserveId: id,
      };

      const result = await axios.put<ReservationResData>(
        `${BACKEND_URL}/reservations`,
        body,
        {
          withCredentials: true,
          params: query,
        }
      );

      return result.data;
    } catch (err) {
      console.error(err);
    }
  }

  public async deleteReservation(id: string): Promise<void> {
    try {
      const query = {
        reserveId: id,
      };

      const result = await axios.delete(`${BACKEND_URL}/reservations`, {
        withCredentials: true,
        params: query,
      });

      return result.data;
    } catch (err) {
      console.error(err);
    }
  }

  public async approveReservation(id: string): Promise<ReservationResData> {
    try {
      const query = {
        reserveId: id,
      };

      const body = {
        isPayed: true,
      };

      const result = await axios.patch<ReservationResData>(
        `${BACKEND_URL}/reservations/payed`,
        body,
        {
          withCredentials: true,
          params: query,
        }
      );

      return result.data;
    } catch (err) {
      console.error(err);
    }
  }

  public async checkAttendReservation(id: string): Promise<ReservationResData> {
    try {
      const query = {
        reserveId: id,
      };

      const body = {
        isAttended: true,
      };

      const result = await axios.patch<ReservationResData>(
        `${BACKEND_URL}/reservations/attend`,
        body,
        {
          withCredentials: true,
          params: query,
        }
      );

      return result.data;
    } catch (err) {
      console.error(err);
    }
  }

  public async cancelReservation(id: string): Promise<ReservationResData> {
    try {
      const query = {
        reserveId: id,
      };

      const result = await axios.patch<ReservationResData>(
        `${BACKEND_URL}/reservations/cancel`,
        {},
        {
          withCredentials: true,
          params: query,
        }
      );

      return result.data;
    } catch (err) {
      console.error(err);
    }
  }
}
