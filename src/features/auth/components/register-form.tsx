import {
  Box,
  Button,
  Container,
  Grid2 as Grid,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import { GeneralInputField } from "../../../components/forms/general-form-field";
import PasswordInputField from "../../../components/forms/password-input-field";
import { Role } from "../../../shared/enum/role";
import useRegisForm from "../hooks/use-regis-form";
import useRoleTab from "../hooks/use-role-tab";

const RegisterForm = ({ isSubmitting, onRegister }) => {
  const { role, handleChangeRoleTab } = useRoleTab();

  const { formData, handleInputChange, handleSubmit, clearFormFields } =
    useRegisForm();

  return (
    <Paper
      sx={{
        backgroundColor: "whitesmoke",
        padding: "0.25vh",
        height: "32rem",
      }}
      elevation={3}
    >
      <Container
        sx={{
          height: "100%",
          paddingBottom: "1rem",
        }}
      >
        <form
          method="get"
          action={"/"}
          onSubmit={async (e) => {
            e.preventDefault();
            await onRegister(formData, role);
          }}
          style={{
            height: "100%",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="form-fields">
            <Box>
              <Tabs
                value={role}
                onChange={(e, role: Role) => {
                  handleChangeRoleTab(e, role);
                  clearFormFields();
                }}
                aria-label="basic tabs example"
              >
                <Tab label="Customer" value={Role.Customer} />
                <Tab label="Restaurant" value={Role.Restaurant} />
              </Tabs>
            </Box>
            <Box>
              <h4>as {role}</h4>
            </Box>
            <Box>
              {role === Role.Customer ? (
                <Grid container mt={1} spacing={2}>
                  <Grid size={6}>
                    <GeneralInputField
                      required={true}
                      onChange={handleInputChange}
                      type={"text"}
                      id={"fname-field"}
                      name={"fName"}
                      label={"Firstname"}
                    />
                  </Grid>
                  <Grid size={6}>
                    <GeneralInputField
                      required={true}
                      onChange={handleInputChange}
                      type={"text"}
                      id={"lname-field"}
                      name={"lName"}
                      label={"Lastname"}
                    />
                  </Grid>
                </Grid>
              ) : (
                <>
                  <Box mt={1}>
                    <GeneralInputField
                      required={true}
                      onChange={handleInputChange}
                      type={"text"}
                      id={"name-field"}
                      name={"name"}
                      label={"Restaurant Name"}
                    />
                  </Box>
                  <Box mt={1}>
                    <GeneralInputField
                      required={true}
                      type={"text"}
                      onChange={handleInputChange}
                      id={"address-field"}
                      name={"address"}
                      label={"Address"}
                    />
                  </Box>
                </>
              )}
              <Box mt={1}>
                <GeneralInputField
                  required={true}
                  type={"email"}
                  onChange={handleInputChange}
                  id={"email-field"}
                  name={"email"}
                  label={"Email"}
                />
              </Box>
              <Box mt={1}>
                <PasswordInputField onChange={handleInputChange} />
              </Box>
              <Box mt={1}>
                <GeneralInputField
                  required={true}
                  type={"text"}
                  onChange={handleInputChange}
                  id={"phone-field"}
                  name={"phone"}
                  label={"Phone Number"}
                />
              </Box>
            </Box>
          </div>
          <Box mt={3}>
            <Button
              disabled={isSubmitting}
              type="submit"
              color="secondary"
              variant="contained"
            >
              Create New Account
            </Button>
          </Box>
        </form>
      </Container>
    </Paper>
  );
};

export default RegisterForm;
