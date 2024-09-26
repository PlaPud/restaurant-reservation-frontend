import { useNavigate } from "react-router-dom";
import useToggle from "../../../hooks/use-toggle";
import { Role } from "../../../shared/enum/role";
import { UserLoginReqBody } from "../../../shared/interface/user";
import { IAuthService } from "../services/auth-service.interface";
import { delay } from "../../../shared/utils/mock-utils";

const useLogin = (service: IAuthService) => {
  const { toggle: isSubmitting, handleToggle: toggleSubmitting } = useToggle();

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

      navigate("/home");
    } catch (error) {
      console.log(error);
    } finally {
      toggleSubmitting();
    }

    console.log(formData);
  };

  return { isSubmitting, handleLoginService };
};

export default useLogin;
