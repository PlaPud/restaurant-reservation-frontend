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
                <Grid container mt={1} spacing={2}>
                  <Grid size={6}>
                    <GeneralInputField
                      required={true}
                      onChange={handleInputChange}
                      type={"text"}
                      id={"fname-field"}
                      name={"fName"}
                      label={"ชื่อ"}
                    />
                  </Grid>
                  <Grid size={6}>
                    <GeneralInputField
                      required={true}
                      onChange={handleInputChange}
                      type={"text"}
                      id={"lname-field"}
                      name={"lName"}
                      label={"นามสกุล"}
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
                      label={"ชื่อร้าน"}
                    />
                  </Box>
                  <Box mt={1}>
                    <GeneralInputField
                      required={true}
                      type={"text"}
                      onChange={handleInputChange}
                      id={"address-field"}
                      name={"address"}
                      label={"ที่ตั้งร้านเลขที่"}
                    />
                  </Box>
                  <Grid mt={2} mb={2} spacing={1} container>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <SelectFormField
                        id="province-field"
                        label="จังหวัด"
                        name="province"
                        selectedValue={selectedAddress.province}
                        items={preFetchedProvinces}
                        onChange={(e) => {
                          handleChangeProvince(e);
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <SelectFormField
                        id="district-field"
                        label="อำเภอ/แขวง"
                        name="district"
                        selectedValue={selectedAddress.district}
                        items={fetchedDistricts}
                        onChange={(e) => {
                          handleChangeDistrict(e);
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <SelectFormField
                        id="sub-district-field"
                        label="ตำบล/เขต"
                        name="subDistrict"
                        selectedValue={selectedAddress.subDistrict}
                        items={fetchedSubDists}
                        onChange={(e) => {
                          handleChangeSubDistrict(e);
                        }}
                      />
                    </Grid>
                  </Grid>
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
                  label={"เบอร์โทรศัพท์"}
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
