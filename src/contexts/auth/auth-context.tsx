import { createContext, useContext } from "react";
import { TokenRole } from "../../shared/enum/role";

export interface AuthContextValue {
  user: UserData | null;
}

export interface UserData {
  role: TokenRole | null;
  id: string | null;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);
