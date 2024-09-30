import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

export const GeneralInputField = ({
  required = false,
  value = undefined,
  type,
  onChange,
  id,
  name,
  label,
}) => {
  return (
    <FormControl fullWidth={true}>
      <InputLabel htmlFor={id} shrink={Boolean(value)}>
        {label}
      </InputLabel>
      <OutlinedInput
        defaultValue={value}
        value={value}
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
