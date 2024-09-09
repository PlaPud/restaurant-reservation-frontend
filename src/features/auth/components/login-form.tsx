import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Tab, Tabs } from '@mui/material'
import useToggle from '../../../hooks/use-toggle'
import { Role } from '../../../shared/enum/role'
import useLoginForm from '../hooks/use-login-form'
import useRoleTab from '../hooks/use-role-tab'

const LoginForm = ({ isSubmitting ,onLogin }) => {

  const { toggle, handleToggle } = useToggle();
  const { role, handleChangeRoleTab } = useRoleTab();
  const { formData, handleInputChange, handleSubmit } = useLoginForm()


  return (
    <Paper 
    sx={{
      backgroundColor: "whitesmoke",
      padding: "0.25vh",
      height: "20rem",
    }}
    elevation={3}
    >
      <Container sx={{
        justifyContent: "space-between",
        flexGrow: "1"
      }}>
        <Box>
          <Tabs value={role} onChange={handleChangeRoleTab} aria-label="basic tabs example">
            <Tab label="Customer" value={Role.Customer}/>
            <Tab label="Restaurant" value={Role.Restaurant}/>
          </Tabs>
        </Box>
        <Box>
          <h4>as {role}</h4>
        </Box>
        <form method='get' action={'/'} onSubmit={async (e) => {
          e.preventDefault()
          await onLogin(formData, role)
        }} >
          <Box mt={2}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="email-field">Email</InputLabel>
              <OutlinedInput name='email' id="email-field" onChange={handleInputChange}  fullWidth={true} label="Email"/>
            </FormControl>
          </Box>
          <Box mt={2}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="pass-field">Password</InputLabel>
              <OutlinedInput
                onChange={handleInputChange}
                name="password"
                id="pass-field"
                type={toggle ? "text": "password"}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleToggle}
                      edge="end"
                    >{toggle ? <VisibilityOff/> : <Visibility/>}</IconButton>
                  </InputAdornment>
                }
              ></OutlinedInput>
            </FormControl>
          </Box>
          <Box mt={3}>
            <Button disabled={isSubmitting} type="submit" color="primary" variant="outlined">
              Login
            </Button>
          </Box>
        </form>
      </Container>
    </Paper>
  )
}

export default LoginForm