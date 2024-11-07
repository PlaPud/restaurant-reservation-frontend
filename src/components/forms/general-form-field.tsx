import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { useEffect, useState } from "react";

export const GeneralInputField = ({
  required = false,
  value = undefined,
  type,
  onChange,
  id,
  name,
  label,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e); // Call the passed onChange function
  };

  return (
    <FormControl fullWidth>
      <InputLabel
        htmlFor={id}
        shrink={Boolean(inputValue ?? value) || isFocused}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        defaultValue={inputValue ?? value}
        value={inputValue ?? value}
        required={required}
        name={name}
        id={id}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        label={label}
        type={type}
        fullWidth
      />
    </FormControl>
  );
};
