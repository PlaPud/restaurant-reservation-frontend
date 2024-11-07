import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { NavData } from "../../../shared/interface/navbar";
import { Link } from "react-router-dom";
import { Logout } from "@mui/icons-material";

const UserMenuBar = ({
  settings,
  userMenuEl,
  onOpenUser,
  onCloseUser,
  onLogoutClicked,
}) => {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={onOpenUser} sx={{ p: 0 }}>
          <Avatar alt="User Account" src="src\assets\default-profile.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={userMenuEl}
        variant="menu"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(userMenuEl)}
        onClose={onCloseUser}
      >
        {Object.values(settings).map((setting: NavData) => (
          <MenuItem key={setting.title} onClick={onCloseUser}>
            <Link
              style={{ textDecoration: "none" }}
              key={setting.title}
              to={setting.route}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {setting.itemIcon}
                <Box ml={1}>{setting.title}</Box>
              </Typography>
            </Link>
          </MenuItem>
        ))}
        <MenuItem>
          <Link
            style={{ textDecoration: "none" }}
            to={"/"}
            onClick={onLogoutClicked}
          >
            <Typography
              sx={{
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                textDecoration: "none",
                color: "black",
              }}
            >
              <Logout />
              <Box ml={1}>{`ออกจากระบบ`}</Box>
            </Typography>
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenuBar;
