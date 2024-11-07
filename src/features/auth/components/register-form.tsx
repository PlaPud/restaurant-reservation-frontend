import { Box, Button, Container, Paper, Tab, Tabs } from "@mui/material";
import CustomerDataForm from "../../../components/forms/group/customer-data-form";
import RestaurantDataForm from "../../../components/forms/group/restaurant-data-form";
import { ThaiAddressAxiosService } from "../../../services/address/thai-address-axios-service";
import { Role } from "../../../shared/enum/role";
import useRegisForm from "../hooks/use-regis-form";
import useRoleTab from "../hooks/use-role-tab";

const RegisterForm = ({ isSubmitting, onRegister }) => {
  const service = new ThaiAddressAxiosService();

  const { role, handleChangeRoleTab } = useRoleTab();

  const hook = useRegisForm(service);

  return (
    <>
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
              await onRegister(hook.formData, role);
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
                    hook.clearFormFields();
                  }}
                  aria-label="basic tabs example"
                >
                  <Tab
                    sx={{ fontSize: "1.2rem" }}
                    label="ลูกค้า"
                    value={Role.Customer}
                  />
                  <Tab
                    sx={{ fontSize: "1.2rem" }}
                    label="ร้านอาหาร"
                    value={Role.Restaurant}
                  />
                </Tabs>
              </Box>

              <Box>
                <h4>as {role}</h4>
              </Box>
              <Box>
                {role === Role.Customer ? (
                  <CustomerDataForm onChange={hook.handleInputChange} />
                ) : (
                  <RestaurantDataForm
                    onChange={hook.handleInputChange}
                    subDistrictItems={hook.fetchedSubDists}
                    districtItems={hook.fetchedDistricts}
                    provinceItems={hook.preFetchedProvinces}
                    onChangeSubDistrict={hook.handleChangeSubDistrict}
                    onChangeDistrict={hook.handleChangeDistrict}
                    onChangeProvince={hook.handleChangeProvince}
                    selectedAddressItems={hook.selectedAddress}
                  />
                )}
              </Box>
            </div>
            <Box mt={3}>
              <Button
                sx={{ fontSize: "1.1rem" }}
                disabled={isSubmitting}
                type="submit"
                color="secondary"
                variant="contained"
              >
                สร้างบัญชีใหม่
              </Button>
            </Box>
          </form>
        </Container>
      </Paper>
    </>
  );
};

export default RegisterForm;
