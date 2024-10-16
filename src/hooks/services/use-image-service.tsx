import React, { useState } from "react";
import { IImageService } from "../../services/img/image-service.interface";
import { ImageFireBaseService } from "../../services/img/firebase/image-firebase-service";

const useImageService = () => {
  const [service, setService] = useState<IImageService>(
    new ImageFireBaseService()
  );
  return service;
};

export default useImageService;