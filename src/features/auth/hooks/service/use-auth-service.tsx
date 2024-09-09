import { useEffect, useState } from 'react';
import { AuthMockService } from '../../service/auth-mock-service';
import { IAuthService } from '../../service/auth-service.interface';

const useAuthService = () => {

  const [service, setService] = useState<IAuthService>(null);
  
  useEffect(() => {
    const authService = new AuthMockService();
    setService(authService);
  }, []);
  
  return service
}

export default useAuthService