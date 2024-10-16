import { Add, KeyboardArrowUpRounded, Search } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Fab,
  Grid2 as Grid,
  Pagination,
  Tab,
  Tabs,
} from "@mui/material";
import { ChangeEvent, SyntheticEvent } from "react";
import { ScrollTop } from "../../../../components/appbar/scroll-top";
import ReservationCardList from "../../../../components/card-list/reservation-card-list";
import { GeneralInputField } from "../../../../components/forms/general-form-field";
import ConfirmPopup from "../../../../components/popup/confirm-popup";
import CreateReserveModal from "../../../../features/reservation-org/components/create-reserve-modal";
import ReservationTabPanel from "../../../../features/reservation-org/components/reservation-tab-panel";
import useOrganizeReserveService from "../../../../features/reservation-org/hooks/service/use-organize-reserve-service";
import useOrganizeReservation from "../../../../features/reservation-org/hooks/use-organize-reservation";
import {
  PickerChangeHandlerContext,
  DateTimeValidationError,
} from "@mui/x-date-pickers";
import EditReserveModal from "../../../../features/reservation-org/components/edit-reserve-modal";

const OrganizeReservation = () => {
  const service = useOrganizeReserveService();
  const hook = useOrganizeReservation(service);

  const tabs = [
    { index: 0, title: "สถานะ ยังไม่มีการจอง" },
    { index: 1, title: "สถานะ รอยืนยันการจ่าย" },
    { index: 2, title: "สถานะ จองสำเร็จ" },
    { index: 3, title: "สถานะ เข้าร้านแล้ว/การจองที่หมดอายุ" },
    { index: 4, title: null },
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
                hook.handleFetch(newTab, 1, hook.searchQSubmit);
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
            <Box mt={3}>
              <Button
                size="large"
                variant="contained"
                endIcon={<Add />}
                color="secondary"
                sx={{ color: "white" }}
                fullWidth
                onClick={hook.handleCreateBtnClicked}
              >
                เพิ่มรายการจอง
              </Button>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            {hook.isLoading && (
              <Backdrop
                sx={(theme) => ({
                  color: "#fff00",
                  zIndex: theme.zIndex.drawer + 1,
                })}
                open={true}
              >
                <CircularProgress color="primary" />
              </Backdrop>
            )}
            <Box>
              <h2>จัดการรายการจอง</h2>
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
                  hook.handleFetch(hook.tabIndex, newPage, hook.searchQSubmit)
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
                    collections={hook.displayItems}
                    onEachDelClick={hook.handleDeleteBtnClicked}
                    onEachEditClick={hook.handleEditBtnClicked}
                    onEachApproveClick={hook.handleApprovePayment}
                    onEachCancelClick={hook.handleCancelReserve}
                    onEachInspectSlipClick={hook.handleInspectSlipClicked}
                    onEachCheckAttendClick={hook.handleCheckAttended}
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
        <CreateReserveModal
          isOpen={hook.isCreateModalOpen}
          formData={hook.formData}
          onClose={hook.handleCloseModal}
          onChange={hook.handleTextFormChange}
          onSubmit={hook.handleSubmitReserve}
          onDateChange={hook.handleDateChange}
        />
        <EditReserveModal
          formData={hook.editFormData}
          isOpen={hook.isEditModalOpen}
          onDateChange={hook.handleDateChangeEdit}
          onChange={hook.handleTextFormChangeEdit}
          onSubmit={hook.handleConfirmEdit}
          onClose={hook.handleCloseEditModal}
        />
        <ConfirmPopup
          isOpen={hook.isCancelModalOpen}
          title={"ยกเลิกการจอง"}
          text={"ต้องการยกเลิกรายการจองนี้"}
          onConfirm={hook.handleConfirmCancel}
          onClose={hook.handleCloseCancelModal}
        />
        <ConfirmPopup
          isOpen={hook.isDeleteModalOpen}
          title={"ลบการจอง"}
          text={"ต้องการลบรายการจองนี้"}
          onConfirm={hook.handleConfirmDelete}
          onClose={hook.handleCloseDelModal}
        />
      </Container>
    </>
  );
};

export default OrganizeReservation;
