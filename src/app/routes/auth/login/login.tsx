import { Box, Button, Container, Grid2 as Grid } from '@mui/material'
import LoginForm from '../../../../features/auth/components/login-form'
import useAuthService from '../../../../features/auth/hooks/service/use-auth-service'
import useLogin from '../../../../features/auth/hooks/use-login'
import { UserLoginData } from '../../../../shared/interface/user'
import { Role } from '../../../../shared/enum/role'

const Login = () => {

  const service  = useAuthService();
  const { handleLoginService } = useLogin(service);
  
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 , md: 6 }} >
            <Box mt={5} className="header">
              <h1>Login</h1>
            </Box>
            <Box mt={2} className="login-form">
              <LoginForm onLogin={handleLoginService}
              />
            </Box>
            <Box className="register-link">
              <p>don't have any account? </p>
              <a href='/register'>Sign Up</a>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Login