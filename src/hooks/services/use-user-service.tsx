import React, { useState } from "react";
import { UserAxiosService } from "../../services/user/user-axios-service";
import { IUserService } from "../../services/user/user-service.interface";
import { UserMockService } from "../../services/user/user-mock-service";

const useUserService = () => {
  const [service, setService] = useState<IUserService>(new UserAxiosService());
  return service;
};

export default useUserService;
