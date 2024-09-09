import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { UserLoginData } from '../../../shared/interface/user';

export interface CustomerRegisData extends UserLoginData{
  fName: string;
  lName: string;
  phone: string;
}

export interface RestaurantRegisData extends UserLoginData {
  name: string;
  address: string;
  phone: string;
}

export type UserRegisterData = CustomerRegisData | RestaurantRegisData

const useRegisForm = <T extends CustomerRegisData | RestaurantRegisData>(defaultForm: T) => {
  const [formData, setFormData] = useState<T>(defaultForm)


  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // const formData : User = { email, password };
    // console.log(formData);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return {
    formData,
    handleInputChange,
    handleSubmit,
  };

}

export default useRegisForm