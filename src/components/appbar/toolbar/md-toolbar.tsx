import { FoodBankRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { NavData } from "../../../shared/interface/navbar";

const MdToolbar = ({ pages, onCloseNav }) => {
  return (
    <>
      <FoodBankRounded
        fontSize="large"
        sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "white" }}
      />
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
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {Object.values(pages).map((page: NavData) => (
          <Button
            key={page.title}
            href={page.route}
            onClick={onCloseNav}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page.title}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default MdToolbar;
