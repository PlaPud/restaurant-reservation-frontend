import { CustomerResData } from "../../../shared/interface/user";
import { CustomerEditData } from "../hooks/use-my-profile";

export interface IMyProfileService {
  deleteProfileImg(): Promise<void>;
  editMyProfile(body: CustomerEditData, imgFile?: File): Promise<any>;
}
