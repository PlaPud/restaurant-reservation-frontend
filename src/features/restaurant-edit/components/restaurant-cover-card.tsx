import { Box, Card, CardMedia } from "@mui/material";
import React from "react";
import { RESTAURANT_PLACEHOLDER_IMG } from "../../../shared/constants";

const RestaurantCoverCard = ({ cover, title, addressString }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        width: "100%",
        height: "400px",
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        height="400"
        image={cover?.length > 0 ? cover : RESTAURANT_PLACEHOLDER_IMG}
        alt="restaurant-cover-image"
      />
      <Box
        sx={{
          backgroundColor: "black",
        }}
      ></Box>
      <Box
        position={"absolute"}
        textAlign={"center"}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "whitesmoke",
          width: "100%",
          height: "100%",
        }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <Box fontWeight={400} fontSize={"4rem"}>
          {title}
        </Box>
        <Box fontWeight={200} fontSize={"2rem"}>
          {addressString}
        </Box>
      </Box>
    </Card>
  );
};

export default RestaurantCoverCard;
