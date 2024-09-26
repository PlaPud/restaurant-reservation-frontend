import { Box, Container, Grid2 as Grid } from "@mui/material";
import LoginForm from "../../../../features/auth/components/login-form";
import useAuthService from "../../../../features/auth/hooks/service/use-auth-service";
import useLogin from "../../../../features/auth/hooks/use-login";

const Login = () => {
  const service = useAuthService();
  const { isSubmitting, handleLoginService } = useLogin(service);
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box mt={5} className="header">
              <h1>Login</h1>
            </Box>
            <Box mt={2} className="login-form">
              <LoginForm
                isSubmitting={isSubmitting}
                onLogin={handleLoginService}
              />
            </Box>
            <Box className="register-link" display={"inline-flex"}>
              <Box marginRight={1}>
                <p>ยังไม่มีบัญชี? </p>
              </Box>
              <Box>
                <p>
                  <a href="/register">ลงทะเบียนที่นี่</a>
                </p>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
