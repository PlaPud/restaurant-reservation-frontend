import { faker } from "@faker-js/faker";
import { IFilterRestaurant } from "../../../shared/interface/search";
import { RestaurantResData } from "../../../shared/interface/user";
import { IRestaurantListService } from "./restaurant-list-service.interface";
import { PAGE_SIZE } from "../../../shared/constants";
import {
  delay,
  getMockRestaurantImgSrc,
} from "../../../shared/utils/mock-utils";

export class RestaurantListMockService implements IRestaurantListService {
  private _restaurants: Record<number, RestaurantResData[]> = {
    1: [],
    2: [],
    3: [],
  };

  public constructor() {
    Object.entries(this._restaurants).forEach(([key, value]) => {
      const result = [...this.createOnePageList()];
      this._restaurants[key] = result;
    });
  }

  public async fetchRestaurantList(page: number): Promise<RestaurantResData[]> {
    await delay(750);

    if (!this._restaurants[page]) return [];

    return this._restaurants[page];
  }

  public async fetchRestaurantsWithFilter(
    page: number,
    searchQuery: string,
    filter: IFilterRestaurant
  ): Promise<RestaurantResData[]> {
    await delay(750);

    if (!this._restaurants[page]) return [];

    return this._restaurants[page].filter((data) =>
      this.matchWithFilterValue(filter, data)
    );
  }

  private createOnePageList = () => {
    const results = [];

    for (let i = 0; i < PAGE_SIZE; i++) {
      const mockRestaurant: RestaurantResData = {
        restaurantId: faker.string.uuid(),
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        province: faker.location.state(),
        district: faker.location.city(),
        subDistrict: faker.location.street(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        reservations: [],
        profileimgPath: getMockRestaurantImgSrc(),
        description: faker.lorem.lines(5),
      };
      results.push(mockRestaurant);
    }

    return results;
  };

  private matchWithFilterValue = (
    filter: IFilterRestaurant,
    data: RestaurantResData
  ): boolean => {
    let isMatch = false;

    Object.entries(filter).forEach(([key, value]) => {
      isMatch = data[key] === value;
    });

    return isMatch;
  };
}
