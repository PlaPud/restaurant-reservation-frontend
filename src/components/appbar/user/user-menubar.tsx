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

const UserMenuBar = ({ settings, userMenuEl, onOpenUser, onCloseUser }) => {
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
          <MenuItem
            href={setting.route}
            key={setting.title}
            onClick={onCloseUser}
          >
            <Typography
              component={"a"}
              href={setting.route}
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
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default UserMenuBar;
