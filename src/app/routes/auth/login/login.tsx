import { Box, Button, Container, Grid2 as Grid } from '@mui/material'
import React from 'react'
import LoginForm from '../../../../features/auth/components/login-form'

const Login = () => {
  
  //TODO : Create useLogin hook

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 , md: 6 }} >
            <Box className="header">
              <h1>Login</h1>
            </Box>
            <Box mt={2} className="login-form">
              {/* TODO: LoginForm Component <LoginForm/> */}
              <LoginForm/>
            </Box>
            <Box>
              <Button/>
            </Box>
            <Box className="register-link">
              {/* TODO: Add Link to Register*/}
              <p>don't have any account? </p>
              <a href='/register'>Sign Up</a>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            Right Grid
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Login