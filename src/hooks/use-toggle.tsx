import { useState } from "react"

const useToggle = (isToggle? : boolean) => {
  
  const [toggle, setToggle] = useState(isToggle) 
  
  const handleToggle = () => {
    setToggle((toggle) => !toggle) 
  }

  return {toggle, handleToggle}
  
}

export default useToggle