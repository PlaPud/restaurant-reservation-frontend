import { Box, Container, Grid2 as Grid } from "@mui/material";
import LoginForm from "../../../../features/auth/components/login-form";
import useAuthService from "../../../../features/auth/hooks/service/use-auth-service";
import useLogin from "../../../../features/auth/hooks/use-login";
import { Link } from "react-router-dom";
import InfoPopup from "../../../../components/popup/info-popup";

const Login = () => {
  const service = useAuthService();
  const hook = useLogin(service);
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box mt={5} className="header">
              <h1>Login</h1>
            </Box>
            <Box mt={2} className="login-form">
              <LoginForm
                isSubmitting={hook.isSubmitting}
                onLogin={hook.handleLoginService}
              />
            </Box>
            <Box className="register-link" display={"inline-flex"}>
              <Box marginRight={1}>
                <p>ยังไม่มีบัญชี? </p>
              </Box>
              <Box>
                <p>
                  <Link to="/register">ลงทะเบียนที่นี่</Link>
                </p>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}></Grid>
        </Grid>
      </Container>
      <InfoPopup
        isOpen={hook.isFailModalOpen}
        title={"การเข้าสู่ระบบผิดพลาด"}
        text={`อีเมล/รหัสผ่าน ผิดพลาด\nโปรดตรวจสอบรายละเอียดให้ถูกต้อง`}
        onClose={hook.handleFailModalClose}
      />
    </>
  );
};

export default Login;
