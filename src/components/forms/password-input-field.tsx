import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import useToggle from "../../hooks/use-toggle";

const PasswordInputField = ({ onChange }) => {
  const { toggle, handleToggle } = useToggle();

  return (
    <FormControl fullWidth={true}>
      <InputLabel htmlFor="pass-field">Password</InputLabel>
      <OutlinedInput
        required={true}
        onChange={onChange}
        name="password"
        id="pass-field"
        type={toggle ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleToggle}
              edge="end"
            >
              {toggle ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      ></OutlinedInput>
    </FormControl>
  );
};

export default PasswordInputField;
