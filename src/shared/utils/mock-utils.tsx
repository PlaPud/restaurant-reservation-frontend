import { faker } from "@faker-js/faker";
import {
  CustomerResData,
  ReservationResData,
  RestaurantResData,
} from "../interface/user";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getMockRestaurantImgSrc = () => {
  return `src/assets/restaurant/restaurant-img-${
    Math.floor(Math.random() * 3) + 1
  }.jpg`;
};

export const getMockCustomerData = (
  displayReservation?: ReservationResData[]
): CustomerResData => {
  const data: CustomerResData = {
    customerId: faker.string.uuid(),
    fName: faker.person.firstName(),
    lName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    profileImgPath: "",
    reservations: displayReservation ?? undefined,
  };

  return data;
};

export const getMockRestaurantData = (
  displayReservation?: ReservationResData[]
) => {
  const mockData: RestaurantResData = {
    restaurantId: faker.string.uuid(),
    name: faker.company.name(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    subDistrict: faker.location.county(),
    district: faker.location.city(),
    province: faker.location.state(),
    profileImgPath: "",
    description: faker.lorem.lines(2),
    reservation: displayReservation ?? undefined,
    paymentInfo:
      faker.finance.accountNumber() + " - " + faker.person.fullName(),
  };
  return mockData;
};

export const getMockReservationData = () => {
  const mockData: ReservationResData = {
    reserveId: faker.string.uuid(),
    customerId: faker.string.uuid(),
    customer: getMockCustomerData(),
    restaurantId: faker.string.uuid(),
    restaurant: getMockRestaurantData(),
    lastModified: Math.floor(Date.now() / 1000),
    seats: faker.number.int({ min: 0, max: 20 }),
    reservePrice: faker.number.int({ min: 0, max: 10 }) * 1000,
    reserveDate: Math.floor(Date.now() / 1000),
    payImgUrl:
      faker.number.int({ min: 0, max: 1 }) > 0 ? faker.internet.url() : "",
    isPayed: Math.random() >= 0.5,
    isAttended: Math.random() >= 0.5,
  };

  mockData.isAttended = mockData.isPayed ? mockData.isAttended : false;
  return mockData;
};

export const getFormatDateTime = (seconds: number) => {
  const localeString = new Date(seconds * 1000).toLocaleString("en-TH");
  const formatted = localeString.split(",").join("");
  return formatted;
};

export const isFullNameMatched = (
  rs: ReservationResData,
  searchQuery: string
) => {
  if (searchQuery === "") return true;

  return (rs.customer.fName + " " + rs.customer.fName).includes(searchQuery);
};

export const LOREM = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
            pariatur doloribus repellat soluta quaerat quidem labore provident
            libero hic facilis quia minima, nisi tempora modi, quibusdam omnis
            temporibus exercitationem laborum!`;
