import { CustomerEditData } from "../hooks/use-my-profile";
import { IMyProfileService } from "./my-profile-service.interface";

export class MyProfileMockService implements IMyProfileService {
  public async editMyProfile(
    body: CustomerEditData,
    imgFile?: File
  ): Promise<any> {
    return true;
  }
  public async deleteProfileImg(): Promise<void> {
    return;
  }
}
