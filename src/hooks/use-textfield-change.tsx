import { ChangeEvent, useState } from 'react';

const useTextFieldChange = (defaultText?: string) => {

  const [fieldData, setFieldData] = useState(defaultText ?? "")
  
  const handleFieldChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const data = e.currentTarget.value;
    setFieldData(data)
    console.log(data)
  }

  return { fieldData, handleFieldChange }

}

export default useTextFieldChange