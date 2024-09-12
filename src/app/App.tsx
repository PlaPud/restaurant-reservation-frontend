import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { green, grey, lightGreen } from "@mui/material/colors";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserAppBar from "../components/appbar/user-appbar";
import "./App.scss";
import Login from "./routes/auth/login/login";
import Register from "./routes/auth/register/register";
import LandingPage from "./routes/landing";
import RestaurantList from "./routes/app/restaurant-list";

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: lightGreen[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserAppBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<RestaurantList />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
