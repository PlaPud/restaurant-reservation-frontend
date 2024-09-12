import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Restaurant } from "../../../shared/interface/user";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Card variant="outlined" sx={{ mt: "20px", display: "flex" }}>
      <Box width={240}>
        <CardMedia
          component={"img"}
          sx={{ height: "100%", width: "100%", objectFit: "cover" }}
          src={`src/assets/restaurant/restaurant-img-${
            Math.floor(Math.random() * 3) + 1
          }.jpg`}
        />
      </Box>
      <Box>
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          ></Typography>
          <Typography variant="h5" component="div">
            {restaurant.name}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {restaurant.address}
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium">Get Reservation Now</Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default RestaurantCard;
