import { getDownloadURL, ref } from "firebase/storage";
import { IImageService } from "../image-service.interface";
import { storage } from "./firebase-init";

export class ImageFireBaseService implements IImageService {
  public async fetchImageUrl(imgPath: string): Promise<string> {
    try {
      console.log(imgPath);
      const imageRef = ref(storage, imgPath);
      const url = await getDownloadURL(imageRef);
      console.log("Image URL: ", url);
      return url;
    } catch (error) {
      console.error("Error fetching image: ", error);
    }
  }
}
