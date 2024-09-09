import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { UserLoginData } from '../../../shared/interface/user';

const useLoginForm = () => {
  const [formData, setFormData] = useState<UserLoginData>({
    email: "",
    password: ""
  })

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const body : UserLoginData = formData;
    console.log(body);
  };


  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return {
    formData,
    handleInputChange,
    handleSubmit
  };
};

export default useLoginForm;
