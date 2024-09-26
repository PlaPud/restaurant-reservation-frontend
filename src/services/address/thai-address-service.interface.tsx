import {
  District,
  Province,
  SubDistrict,
} from "../../shared/interface/address";

export interface IThaiAddressService {
  fetchAllProvince(): Promise<Province[]>;
  fetchDistrictsByProvince(provinceId: number): Promise<District[]>;
  fetchSubDistsByDistricts(districtId: number): Promise<SubDistrict[]>;
}
