import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.scss";
import LandingPage from "./routes/landing";
import { AppBar, Container, createTheme, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { AdbRounded } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/auth/login/login";


const theme = createTheme({
  palette: {
    primary: {
      main: green[500]
    },
    secondary: {
      main: green[300]
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbRounded sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "white" }} />
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
                color: "white",
                textDecoration: "none",
              }}
            >
              RESTAURANT RESERVE
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
