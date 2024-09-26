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
import { RestaurantResData } from "../../../shared/interface/user";
import { getMockRestaurantImgSrc } from "../../../shared/utils/mock-utils";

interface RestaurantCardProps {
  restaurant: RestaurantResData;
}

const RestaurantCard: FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Card variant="outlined" sx={{ mt: "20px", display: "flex" }}>
      <Box width={240}>
        <CardMedia
          component={"img"}
          sx={{ height: "100%", width: "100%", objectFit: "cover" }}
          src={restaurant.profileimgPath}
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
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            ตำบล/แขวง {restaurant.subDistrict}, อำเภอ/เขต {restaurant.district}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {restaurant.province}
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" size="large">
            จองโต๊ะร้านนี้
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default RestaurantCard;
