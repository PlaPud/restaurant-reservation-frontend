import { FoodBankRounded, Menu } from "@mui/icons-material";
import {
  Box,
  IconButton,
  MenuItem,
  Menu as MenuToolbar,
  Typography,
} from "@mui/material";
import { NavData } from "../../../shared/interface/navbar";

const XsToolbar = ({ pages, navEl, onOpenNav, onCloseNav }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={onOpenNav}
          sx={{ color: "white" }}
        >
          <Menu />
        </IconButton>
        <MenuToolbar
          id="menu-appbar"
          anchorEl={navEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(navEl)}
          onClose={onCloseNav}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {Object.values(pages).map((page: NavData) => (
            <MenuItem key={page.title} onClick={onCloseNav}>
              <Typography
                component={"a"}
                href={page.route}
                fontSize={"large"}
                sx={{ textAlign: "center" }}
              >
                {page.title}
              </Typography>
            </MenuItem>
          ))}
        </MenuToolbar>
      </Box>
      <FoodBankRounded
        fontSize="large"
        sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: "white" }}
      />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "white",
          textDecoration: "none",
        }}
      >
        RESTAURANT RESERVE
      </Typography>
    </>
  );
};

export default XsToolbar;
