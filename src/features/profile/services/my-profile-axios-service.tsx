import axios from "axios";
import { CustomerEditData } from "../hooks/use-my-profile";
import { IMyProfileService } from "./my-profile-service.interface";
import { BACKEND_URL } from "../../../shared/constants";

export class MyProfileAxiosService implements IMyProfileService {
  public async editMyProfile(
    body: CustomerEditData,
    imgFile?: File
  ): Promise<any> {
    try {
      if (imgFile) {
        const imgFormData = new FormData();

        imgFormData.append("file", imgFile);

        const updatedPathData = await axios.patch(
          `${BACKEND_URL}/customers/profile-img`,
          imgFormData,
          {
            withCredentials: true,
          }
        );
      }

      console.log(body);

      const res = await axios.put(`${BACKEND_URL}/customers/me`, body, {
        withCredentials: true,
      });
    } catch (err) {
      throw new Error(`Cannot Update Profile`);
    }
  }

  public async deleteProfileImg(): Promise<void> {
    try {
      const result = await axios.delete(
        `${BACKEND_URL}/customers/profile-img`,
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      throw new Error(`Cannot Delete Profile Image.`);
    }
  }
}
