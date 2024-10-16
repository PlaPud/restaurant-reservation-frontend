import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "date-fns";
import { createTheme, ThemeProvider } from "@mui/material";
import { green, lightGreen } from "@mui/material/colors";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserAppBar from "../components/appbar/user-appbar";
import "./App.scss";
import OrganizeReservation from "./routes/app/rest-reservation/organize-reservation";
import RestaurantEdit from "./routes/app/restaurant-edit";
import RestaurantList from "./routes/app/restaurant-list";
import Login from "./routes/auth/login/login";
import Register from "./routes/auth/register/register";
import LandingPage from "./routes/landing";
const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: lightGreen[500],
    },
  },
  typography: {
    fontFamily: `"Prompt", Roboto`,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <UserAppBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<RestaurantList />} />
            <Route path="/restaurant/edit" element={<RestaurantEdit />} />
            <Route
              path="/restaurant/reservation"
              element={<OrganizeReservation />}
            />
          </Routes>
        </LocalizationProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
