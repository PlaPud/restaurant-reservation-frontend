import { useNavigate } from "react-router-dom";
import useToggle from "../../../hooks/use-toggle";
import { Role } from "../../../shared/enum/role";
import { UserLoginReqBody } from "../../../shared/interface/user";
import { IAuthService } from "../services/auth-service.interface";
import { delay } from "../../../shared/utils/mock-utils";

const useLogin = (service: IAuthService) => {
  const { toggle: isSubmitting, handleToggle: toggleSubmitting } = useToggle();
  const { toggle: isFailModalOpen, handleToggle: toggleFailModal } =
    useToggle();

  const navigate = useNavigate();

  const handleLoginService = async (formData: UserLoginReqBody, role: Role) => {
    try {
      toggleSubmitting();
      await delay(3000);

      switch (role) {
        case Role.Customer:
          await service.loginCustomer(formData);
          break;
        case Role.Restaurant:
          await service.loginRestaurant(formData);
          break;
      }

      navigate("/home", { replace: true });
      navigate(0);
    } catch (error) {
      // console.log(error);
      toggleFailModal();
    } finally {
      toggleSubmitting();
    }
  };

  const handleFailModalClose = async () => {
    toggleFailModal();
  };

  return {
    isSubmitting,
    isFailModalOpen,
    handleLoginService,
    handleFailModalClose,
  };
};

export default useLogin;
