import {
  Box,
  Button,
  Container,
  FormControl,
  Grid2 as Grid,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import { GeneralInputField } from "../../../components/forms/general-form-field";
import PasswordInputField from "../../../components/forms/password-input-field";
import { Role } from "../../../shared/enum/role";
import useRegisForm, { RestaurantRegisData } from "../hooks/use-regis-form";
import useRoleTab from "../hooks/use-role-tab";
import SelectFormField from "../../../components/forms/select-form-field";
import useSelectAddress from "../../../hooks/use-select-address";
import { ThaiAddressAxiosService } from "../../../services/address/thai-address-axios-service";
import CustomerDataForm from "../../../components/forms/group/customer-data-form";
import RestaurantDataForm from "../../../components/forms/group/restaurant-data-form";

const RegisterForm = ({ isSubmitting, onRegister }) => {
  const service = new ThaiAddressAxiosService();

  const { role, handleChangeRoleTab } = useRoleTab();

  const {
    formData,
    preFetchedProvinces,
    fetchedDistricts,
    fetchedSubDists,
    selectedAddress,
    handleChangeProvince,
    handleChangeDistrict,
    handleChangeSubDistrict,
    handleInputChange,
    handleSubmit,
    clearFormFields,
  } = useRegisForm(service);

  return (
    <Paper
      sx={{
        backgroundColor: "whitesmoke",
        padding: "0.25vh",
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
                <CustomerDataForm onChange={handleInputChange} />
              ) : (
                <RestaurantDataForm
                  onChange={handleInputChange}
                  subDistrictItems={fetchedSubDists}
                  districtItems={fetchedDistricts}
                  provinceItems={preFetchedProvinces}
                  onChangeSubDistrict={handleChangeSubDistrict}
                  onChangeDistrict={handleChangeDistrict}
                  onChangeProvince={handleChangeProvince}
                  selectedAddressItems={selectedAddress}
                />
              )}
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
