export interface IImageService {
  fetchImageUrl(imgPath: string): Promise<any>;
}
