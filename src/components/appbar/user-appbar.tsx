import {
  Edit,
  EventAvailable,
  Home,
  Logout,
  Person,
  Restaurant,
  Storefront,
} from "@mui/icons-material";
import { AppBar, Button, Container, Toolbar } from "@mui/material";
import useAnchor from "../../hooks/appbar/use-anchor-nav";
import { NavData } from "../../shared/interface/navbar";
import MdToolbar from "./toolbar/md-toolbar";
import XsToolbar from "./toolbar/xs-toolbar";
import UserMenuBar from "./user/user-menubar";
import { useContext } from "react";
import { AuthContextValue, useAuth } from "../../contexts/auth/auth-context";
import { TokenRole } from "../../shared/enum/role";
import { TokenRoleWithNull } from "../../features/auth/components/protected-routes";
import { Link } from "react-router-dom";
import useLogout from "../../features/auth/hooks/use-logout";
import useAuthService from "../../features/auth/hooks/service/use-auth-service";

const basePages: Record<string, NavData> = {
  home: {
    title: "ค้นหาร้าน",
    route: "/home",
    itemIcon: <Home />,
  },
};

const UserAppBar = () => {
  const service = useAuthService();

  const authContext = useAuth();

  const { handleLogout } = useLogout(service);

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
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          disableGutters
          id="back-to-top-anchor"
        >
          <MdToolbar
            pages={{
              ...basePages,
              ...buildAppBarPages(authContext),
            }}
            onCloseNav={handleCloseNav}
          />
          <XsToolbar
            pages={{
              ...basePages,
              ...buildAppBarPages(authContext),
            }}
            navEl={navEl}
            onOpenNav={handleOpenNav}
            onCloseNav={handleCloseNav}
          />
          {authContext.user?.role ? (
            <UserMenuBar
              settings={{ ...buildSettingBar(authContext) }}
              userMenuEl={userMenuEl}
              onOpenUser={handleOpenUser}
              onCloseUser={handleCloseUser}
              onLogoutClicked={handleLogout}
            />
          ) : (
            <Link to="/login">
              <Button sx={{ fontSize: "1.2rem", color: "white" }} size="large">
                เข้าสู่ระบบ
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const buildSettingBar = (
  context: AuthContextValue
): Record<string, NavData> => {
  if (!context.user || !context.user.role) {
    return {};
  }

  const { role, id } = context.user;

  const maps = {
    customer: {
      myAccount: {
        title: "บัญชีของฉัน",
        route: "/profile",
        itemIcon: <Person />,
      },
    },
    restaurant: {
      myAccount: {
        title: "แก้ไขหน้าร้าน",
        route: `/restaurant/edit`,
        itemIcon: <Restaurant />,
      },
    },
  };

  return {
    ...maps[role],
  };
};

const buildAppBarPages = (
  context: AuthContextValue
): Record<string, NavData> => {
  if (!context.user || !context.user.role) {
    return {};
  }

  const { role, id } = context.user;

  const pagesMap = {
    customer: {
      myReservations: {
        title: "การจองของฉัน",
        route: "/my-reservation",
        itemIcon: <EventAvailable />,
      },
    },
    restaurant: {
      reservations: {
        title: "จัดการคิวจอง",
        route: "/restaurant/reservation",
        itemIcon: <Edit />,
      },
      restaurantPage: {
        title: "โปรไฟล์ร้านอาหาร",
        route: `/restaurant/${id}`,
        itemIcon: <Storefront />,
      },
    },
  };

  return pagesMap[role];
};

export default UserAppBar;
