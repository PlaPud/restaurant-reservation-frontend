import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { RestaurantResData } from "../../../shared/interface/user";
import { getMockRestaurantImgSrc } from "../../../shared/utils/mock-utils";
import useImageService from "../../../hooks/services/use-image-service";
import { RESTAURANT_PLACEHOLDER_IMG } from "../../../shared/constants";

interface RestaurantCardProps {
  onCardBtnClick: (id: string) => Promise<void>;
  restaurant: RestaurantResData;
}

const RestaurantCard: FC<RestaurantCardProps> = ({
  restaurant,
  onCardBtnClick,
}) => {
  const imgService = useImageService();
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImgUrl = async () => {
      try {
        const result = await imgService.fetchImageUrl(
          restaurant.profileImgPath
        );
        setImgUrl(result);
      } catch (err) {
        console.error(`Cannot Fetch Image`, err);
        setImgUrl(null);
      } finally {
      }
    };

    fetchImgUrl();
  }, [restaurant]);

  return (
    <Card variant="outlined" sx={{ mt: "20px", display: "flex" }}>
      <Box width={240}>
        <CardMedia
          component={"img"}
          sx={{ height: "100%", width: "100%", objectFit: "cover" }}
          src={imgUrl?.length > 0 ? imgUrl : RESTAURANT_PLACEHOLDER_IMG}
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
          <Button
            onClick={() => onCardBtnClick(restaurant.restaurantId)}
            variant="outlined"
            size="large"
          >
            จองโต๊ะร้านนี้
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default RestaurantCard;
