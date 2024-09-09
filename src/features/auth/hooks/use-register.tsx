import useToggle from '../../../hooks/use-toggle'
import { Role } from '../../../shared/enum/role'
import { IAuthService } from '../service/auth-service.interface'
import { CustomerRegisData, RestaurantRegisData, UserRegisterData } from './use-regis-form'

const useRegister = (service: IAuthService) => {

  const { toggle : isSubmitting, handleToggle : toggleSubmitting } = useToggle()

  const handleRegisterService = async (formData: UserRegisterData, role: Role) => {

    toggleSubmitting()

    switch (role) {
      case Role.Customer:
        await service.registerCustomer(formData as CustomerRegisData)
        break;
      case Role.Restaurant:
        await service.registerRestaurant(formData as RestaurantRegisData)
        break;
    }

    toggleSubmitting()
  }

  return { isSubmitting, handleRegisterService }
}

export default useRegister