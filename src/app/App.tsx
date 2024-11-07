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
import RestaurantPage from "./routes/app/restaurant-page";
import MakeReservation from "./routes/app/client-reservation/make-reservation";
import MyReservations from "./routes/app/client-reservation/my-reservations";
import { AuthProvider } from "../contexts/auth/auth-provider";
import useUserService from "../hooks/services/use-user-service";
import { IUserService } from "../services/user/user-service.interface";
import NotFoundPage from "./routes/auth/not-found-page";
import { TokenRole } from "../shared/enum/role";
import {
  CUSTOMER_ROLE_ONLY,
  GUEST_ROLE_ONLY,
  LOGGED_IN_ROLES,
  MAIN_ACTOR_ROLES,
  RESTAURANT_ROLE_ONLY,
} from "../shared/constants";
import ProtectedRoutes from "../features/auth/components/protected-routes";
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
  const userService: IUserService = useUserService();

  return (
    <AuthProvider service={userService}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <UserAppBar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/not-found" element={<NotFoundPage />} />

              <Route element={<ProtectedRoutes authRoles={GUEST_ROLE_ONLY} />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              <Route element={<ProtectedRoutes authRoles={LOGGED_IN_ROLES} />}>
                <Route path="/home" element={<RestaurantList />} />
              </Route>

              <Route
                element={<ProtectedRoutes authRoles={CUSTOMER_ROLE_ONLY} />}
              >
                <Route path="/my-reservation" element={<MyReservations />} />
                <Route
                  path="/restaurant/:restaurantId/reserve/:reserveId"
                  element={<MakeReservation />}
                />
              </Route>

              <Route
                element={<ProtectedRoutes authRoles={RESTAURANT_ROLE_ONLY} />}
              >
                <Route path="/restaurant/edit" element={<RestaurantEdit />} />
                <Route
                  path="/restaurant/reservation"
                  element={<OrganizeReservation />}
                />
              </Route>

              <Route element={<ProtectedRoutes authRoles={MAIN_ACTOR_ROLES} />}>
                <Route
                  path="/restaurant/:restaurantId"
                  element={<RestaurantPage />}
                />
              </Route>
            </Routes>
          </LocalizationProvider>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
