import { ChangeEvent, SyntheticEvent, useState } from "react";
import { UserLoginReqBody } from "../../../shared/interface/user";
import { useNavigate } from "react-router-dom";

const useLoginForm = () => {
  const [formData, setFormData] = useState<UserLoginReqBody>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const body: UserLoginReqBody = formData;
    console.log(body);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
  };
};

export default useLoginForm;
