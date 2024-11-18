import React, { Children, FC } from "react";
import { TokenRole } from "../../../shared/enum/role";
import { useAuth } from "../../../contexts/auth/auth-context";
import { Navigate, Outlet } from "react-router-dom";
import { LinearProgress } from "@mui/material";
// import { TokenRoleWithNull } from "./protected-routes";

export type TokenRoleWithNull = TokenRole | null;

interface Props {
  authRoles: TokenRoleWithNull[];
}

const ProtectedRoutes: FC<Props> = ({ authRoles }: Props) => {
  const authContext = useAuth();

  if (!authContext.user) return <LinearProgress></LinearProgress>;

  if (!authContext.user.role && !authRoles.includes(null)) {
    return <Navigate to={"/login"} replace />;
  }

  if (!authRoles.includes(authContext.user.role)) {
    return <Navigate to={"/not-found"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
