import { FC, useEffect, useState } from "react";
import { AuthContext, AuthContextValue, UserData } from "./auth-context";
import axios from "axios";
import { BACKEND_URL } from "../../shared/constants";
import { set } from "date-fns";
import { IUserService } from "../../services/user/user-service.interface";
import useToggle from "../../hooks/use-toggle";
import { delay } from "../../shared/utils/mock-utils";

interface Props {
  children: React.ReactNode;
  service: IUserService;
}

export const AuthProvider: FC<Props> = ({ children, service }: Props) => {
  const [user, setUser] = useState<UserData | null>(null);

  const { toggle: isLoading, handleToggle: toggleLoading } = useToggle(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await service.fetchUserData();
        setUser(result);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser({
          role: null,
          id: null,
        });
      } finally {
        toggleLoading();
      }
    };

    if (!user) fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
