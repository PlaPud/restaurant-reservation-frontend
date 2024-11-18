import React from "react";
import { IAuthService } from "../services/auth-service.interface";
import { replace, useNavigate } from "react-router-dom";

const useLogout = (service: IAuthService) => {
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      await service.logout();
      navigate(0);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(`Cannot Logout`, err);
    }
  };

  return {
    handleLogout,
  };
};

export default useLogout;
