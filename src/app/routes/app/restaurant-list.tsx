import { KeyboardArrowUpRounded } from "@mui/icons-material";
import {
  Box,
  Container,
  Fab,
  Grid2 as Grid,
  Pagination,
  Paper,
  Skeleton,
} from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import { ScrollTop } from "../../../components/appbar/scroll-top";
import RestaurantCard from "../../../features/home/components/restaurant-card";
import SearchForm from "../../../features/home/components/search-form";
import useRestaurantListService from "../../../features/home/hooks/service/use-restaurant-list-service";
import useRestaurantList from "../../../features/home/hooks/use-restaurant-list";

const RestaurantList = () => {
  const service = useRestaurantListService();

  const {
    isLoading,
    restaurantList,
    page: currentPage,
    totalPages,
    searchForm,
    searchFormSubmit,
    handleFilterChange,
    handleQueryChange,
    handleSubmitSearchForm,
    handleEachCardBtnClicked,
    handleSearch,
  } = useRestaurantList(service);

  useEffect(() => {
    console.log(`current page: ${currentPage}`);
  }, [currentPage]);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ pt: 2, pb: 10, backgroundColor: "rgba(100, 100, 100, 0.035)" }}
      >
        <Grid mt={6} mr={2} ml={2} container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ mt: 10, height: "100%" }}>
              <Paper
                variant="outlined"
                sx={{
                  position: "sticky",
                  top: "20px",
                  backgroundColor: "whitesmoke",
                  height: "90vh",
                }}
              >
                <SearchForm
                  page={currentPage}
                  searchFormSubmit={searchForm}
                  onFilterChange={handleFilterChange}
                  onQueryChange={handleQueryChange}
                  onSearch={handleSearch}
                  onSubmitForm={handleSubmitSearchForm}
                />
              </Paper>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Box>
              <Box>
                <h1>ร้านอาหารทั้งหมด</h1>
              </Box>
              <Box mt={3}>
                {isLoading
                  ? Array.from({ length: 3 }).map((_, idx) => (
                      <Skeleton
                        key={idx}
                        variant="rounded"
                        width={"100%"}
                        height={"300px"}
                        sx={{ mt: 2 }}
                        animation="wave"
                      />
                    ))
                  : restaurantList.map((data, idx) => (
                      <RestaurantCard
                        key={idx}
                        restaurant={data}
                        onCardBtnClick={handleEachCardBtnClicked}
                      />
                    ))}
              </Box>
              <Box mt={3}>
                <Pagination
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                  shape="rounded"
                  count={totalPages}
                  variant="outlined"
                  size="large"
                  color="primary"
                  page={currentPage}
                  onChange={async (e: ChangeEvent, page: number) => {
                    if (page === currentPage) return;
                    await handleSearch(
                      page,
                      searchFormSubmit.searchQuery,
                      searchFormSubmit.filter
                    );
                  }}
                />
              </Box>
            </Box>
            <ScrollTop>
              <Fab size="small" aria-label="scroll back to top">
                <KeyboardArrowUpRounded />
              </Fab>
            </ScrollTop>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default RestaurantList;
