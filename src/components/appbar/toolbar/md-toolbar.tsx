import { FoodBankRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { NavData } from "../../../shared/interface/navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/auth/auth-context";

const MdToolbar = ({ pages, onCloseNav }) => {
  const authContext = useAuth();

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
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
      </Box>

      {authContext.user?.role && (
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {Object.values(pages).map((page: NavData) => (
            <Link
              style={{ textDecoration: "none" }}
              key={page.title}
              to={page.route}
            >
              <Button
                size="large"
                onClick={onCloseNav}
                sx={{
                  my: 2,
                  fontSize: "1.2rem",
                  color: "white",
                  display: "block",
                }}
              >
                {page.title}
              </Button>
            </Link>
          ))}
        </Box>
      )}
    </>
  );
};

export default MdToolbar;
