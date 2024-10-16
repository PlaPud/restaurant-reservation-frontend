import { Button, Container } from "@mui/material";
import React from "react";
import "./landing.scss";

const LandingPage = () => {
  return (
    <>
      <Container className="landing-body">
        <h1 className="title">Restaurant Reserve</h1>
        <h2 className="title-desc">จองคิวร้านอาหารได้ ทันใจ ทันที!</h2>
        <div>
          <Button
            href="/home"
            variant="outlined"
            color="secondary"
            size="large"
            disableRipple={true}
          >
            เข้าสู่เว็บไซต์
          </Button>
        </div>
      </Container>
    </>
  );
};

export default LandingPage;
