import { AppBar, Container, Toolbar } from "@mui/material";
import useAnchor from "../../hooks/appbar/use-anchor-nav";
import MdToolbar from "./toolbar/md-toolbar";
import XsToolbar from "./toolbar/xs-toolbar";
import UserMenuBar from "./user/user-menubar";
import { NavData } from "../../shared/interface/navbar";
import {
  Edit,
  EventAvailable,
  Home,
  Logout,
  Person,
  Storefront,
} from "@mui/icons-material";

const pages: Record<string, NavData> = {
  home: {
    title: "Home",
    route: "/home",
    itemIcon: <Home />,
  },
  myReservations: {
    title: "การจองของฉัน",
    route: "/my-reservation",
    itemIcon: <EventAvailable />,
  },
  reservations: {
    title: "จัดการคิวจอง",
    route: "/restaurant/reservation",
    itemIcon: <Edit />,
  },
  restaurantPage: {
    title: "โปรไฟล์ร้านอาหาร",
    route: "/restaurant",
    itemIcon: <Storefront />,
  },
};

const settings: Record<string, NavData> = {
  myAccount: {
    title: "My Account",
    route: "/account",
    itemIcon: <Person />,
  },
  signOut: {
    title: "Sign Out",
    route: "/",
    itemIcon: <Logout />,
  },
};

const UserAppBar = () => {
  const {
    anchorEl: navEl,
    handleClickClose: handleCloseNav,
    handleClickOpen: handleOpenNav,
  } = useAnchor();

  const {
    anchorEl: userMenuEl,
    handleClickClose: handleCloseUser,
    handleClickOpen: handleOpenUser,
  } = useAnchor();

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters id="back-to-top-anchor">
          <MdToolbar pages={pages} onCloseNav={handleCloseNav} />
          <XsToolbar
            pages={pages}
            navEl={navEl}
            onOpenNav={handleOpenNav}
            onCloseNav={handleCloseNav}
          />
          <UserMenuBar
            settings={settings}
            userMenuEl={userMenuEl}
            onOpenUser={handleOpenUser}
            onCloseUser={handleCloseUser}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default UserAppBar;
