import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Tab, Tabs } from '@mui/material';
import useToggle from '../../../hooks/use-toggle';
import { Role } from '../../../shared/enum/role';
import useRegisForm from '../hooks/use-regis-form';
import useRoleTab from '../hooks/use-role-tab';

const RegisterForm = ({ isSubmitting, onRegister }) => {
  const { toggle, handleToggle } = useToggle();
  const { role, handleChangeRoleTab } = useRoleTab();

  const { formData, handleInputChange, handleSubmit } = useRegisForm({
    email: "",
    password: "", 
    fName: "",
    lName: "",
    phone: "",
  })

  return (
    <Paper 
    sx={{
      backgroundColor: "whitesmoke",
      padding: "0.25vh",
      height: "32rem",
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
          await onRegister(formData, role)
        }} >
          { role === Role.Customer ? 
            <Box mt={1}>
              <FormControl>
                <InputLabel htmlFor="fname-field">First Name</InputLabel>
                <OutlinedInput name="fName" id="fname-field" onChange={handleInputChange} label="Firstname"/>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="lname-field">Last Name</InputLabel>
                <OutlinedInput name="lName" id="lname-field" onChange={handleInputChange} label="Lastname"/>
              </FormControl>
            </Box> : 
            <Box mt={1}>
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="name-field">Restaurant Name</InputLabel>
                <OutlinedInput name="name" id="name-field" onChange={handleInputChange} fullWidth={true} label="name"/>
              </FormControl>
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="address-field">Address</InputLabel>
                <OutlinedInput name="address" id="address-field" onChange={handleInputChange} fullWidth={true} label="address"/>
              </FormControl>
            </Box>
          }
          <Box mt={2}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="email-field">Email</InputLabel>
              <OutlinedInput name="email" id="email-field" onChange={handleInputChange}  fullWidth={true} label="Email"/>
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
          <Box mt={2}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="phone-field">Phone Number</InputLabel>
              <OutlinedInput name="phone" id="phone-field" onChange={handleInputChange} fullWidth={true} label="Phone"/>
            </FormControl>
          </Box>
          <Box mt={3}>
            <Button disabled={isSubmitting} type="submit" color="secondary" variant="contained">
              Create New Account
            </Button>
          </Box>
        </form>
      </Container>
    </Paper>
  )
}

export default RegisterForm