import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import LandingPage from "./routes/LandingPage";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { AdbRounded } from "@mui/icons-material";

function App() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbRounded sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              RESTAURANT RESERVE
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <LandingPage />
    </>
  );
}

export default App;
