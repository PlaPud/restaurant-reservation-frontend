import axios from "axios";

import {
  Province,
  District,
  SubDistrict,
} from "../../shared/interface/address";
import { IThaiAddressService } from "./thai-address-service.interface";
import { BACKEND_URL } from "../../shared/constants";
export class ThaiAddressAxiosService implements IThaiAddressService {
  public constructor() {}

  public async fetchAllProvince(): Promise<Province[]> {
    try {
      const res = await axios.get(`${BACKEND_URL}/address/provinces`);
      const { data } = res.data;

      console.log(data);

      return data.map((p) => p as Province);
    } catch (err) {
      console.error(err);
    }
  }
  public async fetchDistrictsByProvince(
    province_id: number
  ): Promise<District[]> {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/address/districts/${province_id}`
      );
      const { data } = res.data;

      console.log(data);

      return data.map((d) => d as District);
    } catch (err) {
      console.error(err);
    }
  }
  public async fetchSubDistsByDistricts(
    district_id: number
  ): Promise<SubDistrict[]> {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/address/sub-districts/${district_id}`
      );
      const { data } = res.data;

      console.log(data);

      return data.map((sd) => sd as SubDistrict);
    } catch (err) {
      console.error(err);
    }
  }
}
