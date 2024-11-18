import React, { useState } from "react";
import { IMyProfileService } from "../../services/my-profile-service.interface";
import { MyProfileMockService } from "../../services/my-profile-mock-service";
import { MyProfileAxiosService } from "../../services/my-profile-axios-service";

const useMyProfileService = () => {
  const [service, setService] = useState<IMyProfileService>(
    new MyProfileAxiosService()
  );

  return service;
};

export default useMyProfileService;
