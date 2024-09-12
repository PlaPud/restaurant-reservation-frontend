import { useNavigate } from "react-router-dom";
import useToggle from "../../../hooks/use-toggle";
import { Role } from "../../../shared/enum/role";
import { UserLoginData } from "../../../shared/interface/user";
import { IAuthService } from "../services/auth-service.interface";

const useLogin = (service: IAuthService) => {
  const { toggle: isSubmitting, handleToggle: toggleSubmitting } = useToggle();

  const navigate = useNavigate();

  const handleLoginService = async (formData: UserLoginData, role: Role) => {
    toggleSubmitting();

    switch (role) {
      case Role.Customer:
        await service.loginCustomer(formData);
        break;
      case Role.Restaurant:
        await service.loginRestaurant(formData);
        break;
    }

    toggleSubmitting();

    navigate("/home");

    console.log(formData);
  };

  return { isSubmitting, handleLoginService };
};

export default useLogin;
