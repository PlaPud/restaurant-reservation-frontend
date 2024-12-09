import { KeyboardArrowUpRounded, PaymentsTwoTone } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Divider,
  Fab,
  Grid2 as Grid,
  Paper,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { ScrollTop } from "../../../components/appbar/scroll-top";
import RestaurantCoverCard from "../../../features/restaurant-edit/components/restaurant-cover-card";
import ContactBox from "../../../features/restaurant-page/components/contact-box";
import ReserveModal from "../../../features/restaurant-page/components/reserve-modal";
import ReservePanel from "../../../features/restaurant-page/components/reserve-panel";
import useRestaurantPageService from "../../../features/restaurant-page/hooks/service/use-restaurant-page-service";
import useRestaurantPage from "../../../features/restaurant-page/hooks/use-restaurant-page";
import { LOREM } from "../../../shared/utils/mock-utils";
import { MouseEvent, useEffect } from "react";
import LoadingBackdrop from "../../../components/loading/loading-backdrop";
import { useAuth } from "../../../contexts/auth/auth-context";
import useImageService from "../../../hooks/services/use-image-service";
import { TokenRole } from "../../../shared/enum/role";

const RestaurantPage = () => {
  const service = useRestaurantPageService();
  const imgService = useImageService();
  const hook = useRestaurantPage(service, imgService);

  const authCtx = useAuth();

  return (
    <>
      <Container>
        <Paper
          variant="outlined"
          sx={{
            minHeight: "1000px",
            backgroundColor: grey.A200,
          }}
        >
          <RestaurantCoverCard
            cover={hook.imgUrl}
            title={hook.data ? hook.data.name : "กำลังโหลดข้อมูล"}
            addressString={
              hook.data
                ? `${hook.data.address}, ${hook.data.district} (${hook.data.province})`
                : ""
            }
          />
          <Box>
            <Container maxWidth="md">
              {hook.data && (
                <>
                  <Box mt={5} mb={2}>
                    <h2>{hook.data.name}</h2>
                    <p>
                      ({hook.data.address} {hook.data.subDistrict}{" "}
                      {hook.data.district}, {hook.data.province})
                    </p>
                  </Box>
                  <Divider />
                  <Grid container my={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <ContactBox
                        phone={hook.data.phone}
                        email={hook.data.email}
                      />
                    </Grid>
                    <Grid mb={{ xs: 2, md: 0 }} size={{ xs: 12, md: 6 }}>
                      <h3>ช่องทางการชำระเงิน</h3>
                      <Box mt={2} display={"flex"} alignContent={"center"}>
                        <PaymentsTwoTone />
                        <Box ml={2} sx={{ whiteSpace: "pre-line" }}>
                          {hook.data.paymentInfo}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container spacing={2}>
                    <Grid mb={{ md: 12, xs: 0 }} size={{ xs: 12, md: 6 }}>
                      <Box>
                        <p style={{ whiteSpace: "pre-line" }}>
                          {hook.data.description}
                        </p>
                      </Box>
                    </Grid>
                    <Grid mt={{ xs: 2, md: 4 }} mb={6} size={{ xs: 12, md: 6 }}>
                      {authCtx.user?.role !== TokenRole.Restaurant && (
                        <ReservePanel
                          available={hook.data.reservation.length}
                          onReserveBtnClicked={hook.handleOpenReserveModal}
                        />
                      )}
                    </Grid>
                  </Grid>
                  <Divider />
                </>
              )}
            </Container>
          </Box>
        </Paper>
      </Container>
      <ReserveModal
        isOpen={hook.isOpenReserveModal}
        onClose={hook.handleCloseReserveModal}
        collections={hook.data ? hook.data.reservation : []}
        onEachReserveBtnClick={hook.handleEachReserveBtnClick}
      />
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpRounded />
        </Fab>
      </ScrollTop>
      <LoadingBackdrop isLoading={hook.isLoading} />
    </>
  );
};

export default RestaurantPage;
