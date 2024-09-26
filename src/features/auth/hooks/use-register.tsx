import { useNavigate } from "react-router-dom";
import useToggle from "../../../hooks/use-toggle";
import { Role } from "../../../shared/enum/role";
import { IAuthService } from "../services/auth-service.interface";
import {
  CustomerRegisData,
  RestaurantRegisData,
  UserRegisterData,
} from "./use-regis-form";

const useRegister = (service: IAuthService) => {
  const { toggle: isSubmitting, handleToggle: toggleSubmitting } = useToggle();

  const navigate = useNavigate();

  const handleRegisterService = async (
    formData: UserRegisterData,
    role: Role
  ) => {
    try {
      toggleSubmitting();
      switch (role) {
        case Role.Customer:
          await service.registerCustomer(formData as CustomerRegisData);
          break;
        case Role.Restaurant:
          await service.registerRestaurant(formData as RestaurantRegisData);
          break;
      }
    } catch (error) {
      console.log(error);
    } finally {
      toggleSubmitting();
    }

    navigate("/home");
  };

  return { isSubmitting, handleRegisterService };
};

export default useRegister;