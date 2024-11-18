import axios from "axios";
import { IRestaurantEditService } from "./restaurant-edit-service.interface";
import { BACKEND_URL } from "../../../shared/constants";
import { RestaurantEditData } from "../hooks/use-rest-edit-form";

export class RestaurantEditAxiosService implements IRestaurantEditService {
  public async fetchRestaurant(): Promise<any> {
    try {
      const result = await axios.get(`${BACKEND_URL}/restaurants/me`, {
        withCredentials: true,
      });
      return result.data;
    } catch (err) {
      console.error(err);
    }
  }

  public async deleteProfileImg(): Promise<any> {
    try {
      const result = await axios.delete(
        `${BACKEND_URL}/restaurants/profile-img`,
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  public async updateRestaurant(
    body: RestaurantEditData,
    imgFile?: File
  ): Promise<any> {
    try {
      if (imgFile) {
        const imgFormData = new FormData();

        imgFormData.append("file", imgFile);

        const updatedPathData = await axios.patch(
          `${BACKEND_URL}/restaurants/profile-img`,
          imgFormData,
          {
            withCredentials: true,
          }
        );
      }

      const res = await axios.put(`${BACKEND_URL}/restaurants/me`, body, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
