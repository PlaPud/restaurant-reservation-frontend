import React, { useState } from "react";
import { IImageService } from "../../services/img/image-service.interface";
import { ImageFireBaseService } from "../../services/img/firebase/image-firebase-service";
import { ImageMockService } from "../../services/img/image-mock-service";

const useImageService = () => {
  const [service, setService] = useState<IImageService>(new ImageMockService());
  return service;
};

export default useImageService;
