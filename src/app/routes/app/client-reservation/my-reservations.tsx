import { KeyboardArrowUpRounded, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Fab,
  Grid2 as Grid,
  Pagination,
  Tab,
  Tabs,
} from "@mui/material";
import { SyntheticEvent } from "react";
import { ScrollTop } from "../../../../components/appbar/scroll-top";
import ReservationCardList from "../../../../components/card-list/reservation-card-list";
import { GeneralInputField } from "../../../../components/forms/general-form-field";
import LoadingBackdrop from "../../../../components/loading/loading-backdrop";
import useMyReservationsService from "../../../../features/client-reservation/hooks/service/use-my-reservations-service";
import useMyReservations from "../../../../features/client-reservation/hooks/use-my-reservations";
import ReservationTabPanel from "../../../../features/reservation-org/components/reservation-tab-panel";
import useImageService from "../../../../hooks/services/use-image-service";
import InspectSlipPopup from "../../../../components/popup/inspect-slip-popup";

const MyReservations = () => {
  const service = useMyReservationsService();
  const imgService = useImageService();
  const hook = useMyReservations(service, imgService);

  const tabs = [
    { index: 0, title: "สถานะ รอตรวจสอบ" },
    { index: 1, title: "สถานะ จองสำเร็จ" },
    { index: 2, title: "สถานะ เข้าร้านแล้ว/การจองที่หมดอายุ" },
    { index: 3, title: null },
  ];

  return (
    <>
      <Container>
        <Grid container spacing={2} mt={5}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Tabs
              orientation="vertical"
              variant="fullWidth"
              sx={{
                borderRight: 1,
                borderColor: "divider",
              }}
              value={hook.tabIndex}
              onChange={(e: SyntheticEvent, newTab: number) => {
                hook.handleFetch(newTab, 1, hook.submittedQuery);
              }}
            >
              {tabs.map((tab, idx) => (
                <Tab
                  sx={{
                    fontSize: "1.25rem",
                  }}
                  key={idx}
                  label={tab.title?.split("สถานะ")[1] || "ทั้งหมด"}
                />
              ))}
            </Tabs>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <LoadingBackdrop isLoading={hook.isLoading} />
            <Box>
              <h2>การจองของฉัน</h2>
              <Grid alignItems={"center"} container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 10 }}>
                  <GeneralInputField
                    type={"text"}
                    value={hook.searchQuery}
                    onChange={hook.handleQueryChange}
                    id={"customer-name-search"}
                    name={"customer-name-search"}
                    label={"ค้นหาชื่อลูกค้า"}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                  <Button
                    onClick={hook.handleSearchBtnClicked}
                    fullWidth
                    variant="contained"
                    size="large"
                  >
                    <Search sx={{ color: "white" }} />
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box mt={3} mb={5}>
              <Pagination
                onChange={(e, newPage) =>
                  hook.handleFetch(hook.tabIndex, newPage, hook.submittedQuery)
                }
                page={hook.currentPage}
                count={hook.totalPages}
              />
            </Box>
            <Box mb={5}>
              {tabs.map((tab, idx) => (
                <ReservationTabPanel
                  key={idx}
                  currentIdx={hook.tabIndex}
                  index={tab.index}
                >
                  {tab.title && <h3>{tab.title}</h3>}
                  <ReservationCardList
                    isCustomerView={true}
                    collections={hook.displayItems}
                    onEachInspectSlipClick={hook.handleInspectSlipClicked}
                  />
                </ReservationTabPanel>
              ))}
            </Box>
          </Grid>
        </Grid>
        <ScrollTop>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpRounded />
          </Fab>
        </ScrollTop>
        <InspectSlipPopup
          imgUrl={hook.imgUrl}
          isOpen={hook.isInspectSlip}
          onClose={hook.handleInspectSlipClosed}
        />
      </Container>
    </>
  );
};

export default MyReservations;
