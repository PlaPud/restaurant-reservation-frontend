import { replace, useNavigate } from "react-router-dom";
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
  const { toggle: isSuccessModalOpen, handleToggle: toggleSuccessModal } =
    useToggle();
  const { toggle: isFailModalOpen, handleToggle: toggleFailModal } =
    useToggle();

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

      toggleSuccessModal();
    } catch (error) {
      toggleFailModal();
      console.log(error);
    } finally {
      toggleSubmitting();
    }
  };

  const handleSuccessModalClose = async () => {
    toggleSuccessModal();
    navigate("/", { replace: true });
  };

  const handleFailModalClose = async () => {
    toggleFailModal();
  };

  return {
    isSubmitting,
    isSuccessModalOpen,
    isFailModalOpen,
    handleRegisterService,
    handleSuccessModalClose,
    handleFailModalClose,
  };
};

export default useRegister;
