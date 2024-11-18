import React from "react";
import {
  IOrganizeReservationService,
  ReservationCreateData,
  ReservationPagedResponse,
} from "./organize-reservation-service.interface";
import { ReservationResData } from "../../../shared/interface/user";
import { faker } from "@faker-js/faker";
import {
  delay,
  getMockCustomerData,
  getMockReservationData,
  getMockRestaurantData,
  getRandomActionReservation,
  isFullNameMatched,
} from "../../../shared/utils/mock-utils";

export class OrganizeReservationMockService
  implements IOrganizeReservationService
{
  private readonly _reservations = {
    1: Array.from({ length: 10 }, getRandomActionReservation),
    2: Array.from({ length: 10 }, getRandomActionReservation),
    3: Array.from({ length: 4 }, getRandomActionReservation),
  };

  public async editReservation(
    id: string,
    body: ReservationCreateData
  ): Promise<ReservationResData> {
    await delay(1000);

    let target = null;

    Object.keys(this._reservations).forEach((page) => {
      const pageNumber = Number(page);

      const reservationIndex = this._reservations[pageNumber].findIndex(
        (rs: ReservationResData) => rs.reserveId === id
      );

      if (reservationIndex === -1) return;

      this._reservations[pageNumber][reservationIndex] = {
        ...this._reservations[pageNumber][reservationIndex],
        reserveDate: body.reserveDate,
        reservePrice: body.reservePrice,
        seats: body.seats,
      };
      target = this._reservations[pageNumber][reservationIndex];
    });

    if (!target) {
      throw new Error(`Reservation with id ${id} not found.`);
    }

    return target;
  }

  public async deleteReservation(id: string): Promise<void> {
    await delay(1000);

    let reservationFound = false;

    Object.keys(this._reservations).forEach((page) => {
      const pageNumber = Number(page);

      const reservationIndex = this._reservations[pageNumber].findIndex(
        (rs: ReservationResData) => rs.reserveId === id
      );

      if (reservationIndex === -1) return;

      this._reservations[pageNumber].splice(reservationIndex, 1);
      reservationFound = true;
    });

    if (!reservationFound) {
      throw new Error(`Reservation with id ${id} not found.`);
    }
  }

  public async createReservation(
    body: ReservationCreateData
  ): Promise<ReservationResData> {
    await delay(1000);

    const newReservation: ReservationResData = getMockReservationData();

    newReservation.seats = body.seats;
    newReservation.reservePrice = body.reservePrice;
    newReservation.reserveDate = body.reserveDate;
    newReservation.customerId = undefined;
    newReservation.customer = undefined;
    newReservation.payImgUrl = "";
    newReservation.isPayed = false;
    newReservation.isAttended = false;

    const lastPage = Object.keys(this._reservations).length;

    if (this._reservations[lastPage].length >= 10) {
      this._reservations[lastPage + 1] = [];
    }

    this._reservations[lastPage].push(newReservation);

    return newReservation;
  }

  public async fetchAvailableReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse> {
    if (!this._reservations[page]) throw new Error("Cannot find page.");

    await delay(2000);

    console.log(this._reservations[page]);

    const filteredData = this._reservations[page].filter(
      (rs: ReservationResData) =>
        !rs.customerId && isFullNameMatched(rs, searchQuery)
    );

    return {
      totalPages: 3,
      data: filteredData,
    };
  }

  public async fetchAllReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse> {
    if (!this._reservations[page]) throw new Error("Cannot find page.");
    await delay(2000);

    const filteredData = this._reservations[page].filter(
      (rs: ReservationResData) => isFullNameMatched(rs, searchQuery)
    );

    return {
      totalPages: 3,
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
        rs.payImgUrl.length > 0 &&
        !rs.isPayed &&
        isFullNameMatched(rs, searchQuery)
    );
    return {
      totalPages: 3,
      data: filteredData,
    };
  }

  public async fetchSuccessReservations(
    page: number,
    searchQuery: string
  ): Promise<ReservationPagedResponse> {
    if (!this._reservations[page]) throw new Error("Cannot find page.");
    await delay(2000);
    const filteredData = this._reservations[page].filter(
      (rs: ReservationResData) =>
        rs.isPayed && !rs.isAttended && isFullNameMatched(rs, searchQuery)
    );
    return {
      totalPages: 3,
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
        rs.isAttended && isFullNameMatched(rs, searchQuery)
    );
    return {
      totalPages: 3,
      data: filteredData,
    };
  }

  public async cancelReservation(id: string): Promise<ReservationResData> {
    await delay(1000);

    let target = null;

    Object.keys(this._reservations).forEach((page) => {
      const pageNumber = Number(page);

      const reserveIdx = this._reservations[pageNumber].findIndex(
        (rs: ReservationResData) => rs.reserveId === id
      );

      if (reserveIdx === -1) return;

      this._reservations[pageNumber][reserveIdx].isPayed = false;
      this._reservations[pageNumber][reserveIdx].isAttended = false;
      this._reservations[pageNumber][reserveIdx].customer = undefined;
      this._reservations[pageNumber][reserveIdx].customerId = undefined;
      this._reservations[pageNumber][reserveIdx].payImgUrl = "";

      target = this._reservations[pageNumber][reserveIdx];
    });

    if (!target) {
      throw new Error(`Reservation with id ${id} not found.`);
    }

    return target;
  }

  public async approveReservation(id: string): Promise<ReservationResData> {
    await delay(1000);

    let target = null;

    Object.keys(this._reservations).forEach((page) => {
      const pageNumber = Number(page);

      const reserveIdx = this._reservations[pageNumber].findIndex(
        (rs: ReservationResData) => rs.reserveId === id
      );

      if (reserveIdx === -1) return;

      this._reservations[pageNumber][reserveIdx].isPayed = true;
      target = this._reservations[pageNumber][reserveIdx];
    });

    if (!target) {
      throw new Error(`Reservation with id ${id} not found.`);
    }

    return target;
  }

  public async checkAttendReservation(id: string): Promise<ReservationResData> {
    await delay(1000);

    let target = null;

    Object.keys(this._reservations).forEach((page) => {
      const pageNumber = Number(page);

      const reserveIdx = this._reservations[pageNumber].findIndex(
        (rs: ReservationResData) => rs.reserveId === id
      );

      if (reserveIdx === -1) return;

      this._reservations[pageNumber][reserveIdx].isAttended = true;
      target = this._reservations[pageNumber][reserveIdx];
    });

    if (!target) {
      throw new Error(`Reservation with id ${id} not found.`);
    }

    return target;
  }
}
