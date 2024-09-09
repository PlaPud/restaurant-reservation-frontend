import { SyntheticEvent } from 'react';
import useTextFieldChange from '../../../hooks/use-textfield-change';
import { UserLoginData } from '../../../shared/interface/user';

const useLoginForm = () => {
  const {fieldData: email, handleFieldChange: handleEmailChange} = useTextFieldChange();
  const {fieldData: password, handleFieldChange: handlePassChange} = useTextFieldChange();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData : UserLoginData = { email, password };
    console.log(formData);
  };

  return {
    email, 
    password,
    handleEmailChange,
    handlePassChange,
    handleSubmit,
  };
};

export default useLoginForm;
