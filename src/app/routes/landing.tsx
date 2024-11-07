import { Button, Container } from "@mui/material";
import React, { useContext, useEffect } from "react";
import "./landing.scss";
import { useAuth } from "../../contexts/auth/auth-context";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <Container className="landing-body">
        <h1 className="title">Restaurant Reserve</h1>
        <h2 className="title-desc">จองคิวร้านอาหารได้ ทันใจ ทันที!</h2>
        <div>
          <Link to="/home">
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              disableRipple={true}
            >
              เข้าสู่เว็บไซต์
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default LandingPage;
