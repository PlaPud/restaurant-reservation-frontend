import { Box, Container, Paper, TextField } from '@mui/material'

const ROLE = "customer"

const LoginForm = () => {
  return (
    <Paper 
    sx={{
      backgroundColor: "whitesmoke",
      padding: "0.25vh",
      height: "50vh"
    }}
    elevation={3}
    >
      <Container>
        <Box>
          <h4>as {ROLE}</h4>
        </Box>
        <Box mt={2}>
          <TextField fullWidth={true} variant="outlined" label="Email"/>
        </Box>
        <Box mt={2}>
          <TextField fullWidth={true} variant="outlined" label="Password"/>
        </Box>
      </Container>
    </Paper>
  )
}

export default LoginForm