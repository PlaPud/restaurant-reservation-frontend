import { useState } from "react"

const useToggle = () => {
  
  const [toggle, setToggle] = useState(false) 
  
  const handleClickToggle = () => {
    setToggle((toggle) => !toggle) 
  }

  return {toggle, handleClickToggle}
  
}

export default useToggle