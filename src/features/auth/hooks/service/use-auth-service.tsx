import { useEffect, useState } from "react";
import { AuthMockService } from "../../services/auth-mock-service";
import { IAuthService } from "../../services/auth-service.interface";
import { AuthAxiosService } from "../../services/auth-axios-service";

const useAuthService = () => {
  const [service, setService] = useState<IAuthService>(null);

  useEffect(() => {
    const authService = new AuthAxiosService();
    setService(authService);
  }, []);

  return service;
};

export default useAuthService;
