import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid2 as Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { Restaurant } from "../../../shared/interface/user";
import { faker } from "@faker-js/faker";
import RestaurantCard from "../../../features/home/components/restaurant-card";

const TEMP_DATA: Restaurant[] = [
  {
    restaurantId: faker.string.uuid(),
    name: faker.company.name(),
    address: faker.location.streetAddress(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    reservations: [],
  },
  {
    restaurantId: faker.string.uuid(),
    name: faker.company.name(),
    address: faker.location.streetAddress(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    reservations: [],
  },
  {
    restaurantId: faker.string.uuid(),
    name: faker.company.name(),
    address: faker.location.streetAddress(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    reservations: [],
  },
];

const RestaurantList = () => {
  return (
    <Container>
      <Grid mt={6} mr={2} ml={2} container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper
            variant="outlined"
            sx={{
              position: "sticky",
              backgroundColor: "whitesmoke",
              height: "80vh",
            }}
          ></Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <Box>
            <h2>Find Restaurant</h2>
          </Box>
          <Box mt={3}>
            {TEMP_DATA.map((data, idx) => (
              <RestaurantCard key={idx} restaurant={data} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RestaurantList;
