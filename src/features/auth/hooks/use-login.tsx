import { Role } from '../../../shared/enum/role'
import { UserLoginData } from '../../../shared/interface/user'
import { IAuthService } from '../service/auth-service.interface'

const useLogin = (service: IAuthService) => {

  const handleLoginService = async (formData: UserLoginData, role: Role) =>  {

    switch (role) {
      case Role.Customer: 
        await service.loginCustomer(formData)
        break;
      case Role.Restaurant:
        await service.loginRestaurant(formData)
        break;
    }
  }

  return { handleLoginService }
}

export default useLogin