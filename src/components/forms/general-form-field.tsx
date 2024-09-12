import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

export const GeneralInputField = ({
  required = false,
  type,
  onChange,
  id,
  name,
  label,
}) => {
  return (
    <FormControl fullWidth={true}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        required={required}
        name={name}
        id={id}
        onChange={onChange}
        fullWidth={true}
        label={label}
        type={type}
      />
    </FormControl>
  );
};
