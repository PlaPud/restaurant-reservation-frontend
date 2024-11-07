import { Box, Button, Container, Paper, Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GeneralInputField } from "../../../components/forms/general-form-field";
import PasswordInputField from "../../../components/forms/password-input-field";
import { Role } from "../../../shared/enum/role";
import useLoginForm from "../hooks/use-login-form";
import useRoleTab from "../hooks/use-role-tab";

const LoginForm = ({ isSubmitting, onLogin }) => {
  const { role, handleChangeRoleTab } = useRoleTab();
  const { formData, handleInputChange, handleSubmit } = useLoginForm();

  return (
    <Paper
      sx={{
        backgroundColor: "whitesmoke",
        padding: "0.25vh",
        height: "20rem",
      }}
      elevation={3}
    >
      <Container
        sx={{
          justifyContent: "space-between",
          flexGrow: "1",
        }}
      >
        <Box>
          <Tabs
            value={role}
            onChange={handleChangeRoleTab}
            aria-label="basic tabs example"
          >
            <Tab
              sx={{ fontSize: "1.2rem" }}
              label="ลูกค้า"
              value={Role.Customer}
            />
            <Tab
              sx={{ fontSize: "1.2rem" }}
              label="ร้านอาหาร"
              value={Role.Restaurant}
            />
          </Tabs>
        </Box>
        <Box>
          <h4>as {role}</h4>
        </Box>
        <form
          method="get"
          action={"/"}
          onSubmit={async (e) => {
            e.preventDefault();
            await onLogin(formData, role);
          }}
        >
          <Box mt={2}>
            <GeneralInputField
              type={"email"}
              onChange={handleInputChange}
              id={"email-field"}
              name={"email"}
              label={"Email"}
            />
          </Box>
          <Box mt={2}>
            <PasswordInputField onChange={handleInputChange} />
          </Box>
          <Box mt={3}>
            <Button
              sx={{ fontSize: "1.1rem" }}
              disabled={isSubmitting}
              type="submit"
              color="primary"
              variant="outlined"
            >
              เข้าสู่ระบบ
            </Button>
          </Box>
        </form>
      </Container>
    </Paper>
  );
};

export default LoginForm;
