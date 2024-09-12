import { Box, Container, Grid2 as Grid } from "@mui/material";
import RegisterForm from "../../../../features/auth/components/register-form";
import useAuthService from "../../../../features/auth/hooks/service/use-auth-service";
import useRegister from "../../../../features/auth/hooks/use-register";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const service = useAuthService();
  const { isSubmitting, handleRegisterService } = useRegister(service);
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box mt={5} className="header">
              <h1>Register new Account</h1>
            </Box>
            <Box mt={2} className="login-form">
              <RegisterForm
                isSubmitting={isSubmitting}
                onRegister={handleRegisterService}
              />
            </Box>
            <Box className="login-link">
              <p>already have an account? </p>
              <a href="/login">Sign In</a>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Register;
