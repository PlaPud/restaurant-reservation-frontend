import { SyntheticEvent, useState } from 'react'
import { Role } from '../../../shared/enum/role'

const useRoleTab = () => {
  
  const [role, setRole] = useState(Role.Customer)
  
  const handleChangeRoleTab = (e: SyntheticEvent, value: Role) => {
    setRole(value)
    console.log(value)

    e.preventDefault();
  }

  // const

  return {role, handleChangeRoleTab}
}

export default useRoleTab