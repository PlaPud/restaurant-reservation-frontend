import { Box, Container, Grid2 as Grid } from "@mui/material";
import RegisterForm from "../../../../features/auth/components/register-form";
import useAuthService from "../../../../features/auth/hooks/service/use-auth-service";
import useRegister from "../../../../features/auth/hooks/use-register";
import { Role } from "../../../../shared/enum/role";
import InfoPopup from "../../../../components/popup/info-popup";

const Register = () => {
  const service = useAuthService();
  const hook = useRegister(service);

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box mt={5} className="header">
              <h1>Register new Account</h1>
            </Box>
            <Box mt={2} className="login-form">
              <RegisterForm
                isSubmitting={hook.isSubmitting}
                onRegister={hook.handleRegisterService}
                // defaultRole={Role.Customer}
              />
            </Box>
            <Box className="login-link" display={"inline-flex"}>
              <Box marginRight={1}>
                <p>หากมีบัญชีแล้ว </p>
              </Box>
              <Box>
                <p>
                  <a href="/login">เข้าสู่ระบบ</a>
                </p>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}></Grid>
        </Grid>
      </Container>
      <InfoPopup
        isOpen={hook.isSuccessModalOpen}
        title={"สำเร็จ"}
        text={"ลงทะเบียนสำเร็จ กรุณาเข้าสู่ระบบเพื่อใช้งาน"}
        onClose={hook.handleSuccessModalClose}
      />
      <InfoPopup
        isOpen={hook.isFailModalOpen}
        title={"การลงทะเบียนผิดพลาด"}
        text={"กรุณาตรวจสอบข้อมูลให้ถูกต้อง"}
        onClose={hook.handleFailModalClose}
      />
    </>
  );
};

export default Register;
