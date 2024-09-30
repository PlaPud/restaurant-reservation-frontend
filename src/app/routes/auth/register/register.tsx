import { Box, Container, Grid2 as Grid } from "@mui/material";
import RegisterForm from "../../../../features/auth/components/register-form";
import useAuthService from "../../../../features/auth/hooks/service/use-auth-service";
import useRegister from "../../../../features/auth/hooks/use-register";
import { Role } from "../../../../shared/enum/role";

const Register = () => {
  const service = useAuthService();
  const { isSubmitting, handleRegisterService } = useRegister(service);

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box mt={5} className="header">
              <h1>Register new Account</h1>
            </Box>
            <Box mt={2} className="login-form">
              <RegisterForm
                isSubmitting={isSubmitting}
                onRegister={handleRegisterService}
                defaultRole={Role.Customer}
              />
            </Box>
            <Box className="login-link" display={"inline-flex"}>
              <Box marginRight={1}>
                <p>หากมีบัญชีแล้ว </p>
              </Box>
              <Box>
                <p>
                  <a href="/login">เข้าสู่ระบบ</a>
                </p>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Register;
