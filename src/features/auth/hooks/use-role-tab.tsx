import { SyntheticEvent, useState } from "react";
import { Role } from "../../../shared/enum/role";

const useRoleTab = (defaultRole: Role = Role.Customer) => {
  const [role, setRole] = useState(defaultRole);

  const handleChangeRoleTab = (e: SyntheticEvent, value: Role) => {
    setRole(value);

    e.preventDefault();
  };

  // const

  return { role, handleChangeRoleTab };
};

export default useRoleTab;
