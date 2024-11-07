import { IImageService } from "./image-service.interface";

export class ImageMockService implements IImageService {
  public async fetchImageUrl(imgPath: string): Promise<any> {
    return;
  }
}
