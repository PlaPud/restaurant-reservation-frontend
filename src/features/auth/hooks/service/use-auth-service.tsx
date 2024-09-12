import { useEffect, useState } from "react";
import { AuthMockService } from "../../services/auth-mock-service";
import { IAuthService } from "../../services/auth-service.interface";

const useAuthService = () => {
  const [service, setService] = useState<IAuthService>(null);

  useEffect(() => {
    const authService = new AuthMockService();
    setService(authService);
  }, []);

  return service;
};

export default useAuthService;
