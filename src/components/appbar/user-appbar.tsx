import { AppBar, Container, Toolbar } from "@mui/material";
import useAnchor from "../../hooks/appbar/use-anchor-nav";
import MdToolbar from "./toolbar/md-toolbar";
import XsToolbar from "./toolbar/xs-toolbar";
import UserMenuBar from "./user/user-menubar";
import { NavData } from "../../shared/interface/navbar";

const pages: Record<string, NavData> = {
  home: {
    title: "Home",
    route: "/home",
  },
  myReservations: {
    title: "My Reservations",
    route: "/my-reservations",
  },
  reservations: {
    title: "Reservations",
    route: "/reservations",
  },
  restaurantPage: {
    title: "Restaurant Page",
    route: "/restaurant",
  },
};

const settings: Record<string, NavData> = {
  myAccount: {
    title: "My Account",
    route: "/account",
  },
  signOut: {
    title: "Sign Out",
    route: "/",
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
        <Toolbar disableGutters>
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
