import { ArrowBack, KeyboardArrowUpRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Fab,
  Grid2 as Grid,
  Paper,
  Typography,
} from "@mui/material";
import { ScrollTop } from "../../../../components/appbar/scroll-top";
import UploadFileButton from "../../../../components/forms/upload-file-button";
import UploadImageDisplay from "../../../../components/forms/upload-image-display";
import LoadingBackdrop from "../../../../components/loading/loading-backdrop";
import ConfirmPopup from "../../../../components/popup/confirm-popup";
import InfoPopup from "../../../../components/popup/info-popup";
import ReservationDetailSkeleton from "../../../../features/make-reservation/components/reservation-detail-skeleton";
import useMakeReservationService from "../../../../features/make-reservation/hooks/service/use-make-reservation-service";
import useMakeReservation from "../../../../features/make-reservation/hooks/use-make-reservation";
import { getFormatDateTime } from "../../../../shared/utils/mock-utils";
import useUserService from "../../../../hooks/services/use-user-service";

const MakeReservation = () => {
  const service = useMakeReservationService();
  const userService = useUserService();
  const hook = useMakeReservation(service, userService);

  return (
    <>
      <Container>
        <Box mt={3}>
          <Button
            startIcon={<ArrowBack />}
            size="large"
            color="info"
            onClick={hook.handleReturnClicked}
            sx={{
              fontSize: "1.2rem",
            }}
          >
            ย้อนกลับ
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid mt={1} size={{ xs: 12, md: 6 }}>
            <Box my={3}>
              <h2>ช่องทางการโอนเงิน</h2>
            </Box>
            <Paper variant="outlined">
              {hook.data ? (
                <Box mx={2} my={3}>
                  <Typography whiteSpace={"pre-line"}>
                    {hook.data.restaurant.paymentInfo}
                  </Typography>
                </Box>
              ) : null}
            </Paper>
            <Box my={3}>
              <h2>รายละเอียดการจอง</h2>
            </Box>
            <Paper variant="outlined">
              {hook.data ? (
                <>
                  <Box m={3}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        {hook.data && (
                          <Box>
                            <Typography fontSize={{ xs: "1rem" }}>
                              ชื่อร้าน: {hook.data.restaurant.name}
                            </Typography>
                            <Typography fontSize={{ xs: "1rem" }}>
                              เบอร์โทร: {hook.data.restaurant.phone}
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        {hook.data && (
                          <Box>
                            <Typography fontSize={{ xs: "1rem" }}>
                              ที่ตั้งร้าน: {hook.data.restaurant.address},{" "}
                              {hook.data.restaurant.subDistrict},{" "}
                              {hook.data.restaurant.district} {"จ. "}
                              {hook.data.restaurant.province}
                            </Typography>
                            <Typography fontSize={{ xs: "1rem" }}>
                              อีเมล: {hook.data.restaurant.email}
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                  <Box m={3}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        {hook.userData && (
                          <Box>
                            <Typography fontSize={{ xs: "1.25rem" }}>
                              ผู้จอง: {hook.userData.fName}{" "}
                              {hook.userData.lName}
                            </Typography>
                            <Typography fontSize={{ xs: "1.25rem" }}>
                              เบอร์โทร: {hook.userData.phone}
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                    <Box mt={2}>
                      {hook.data && (
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "1.25rem",
                            }}
                          >
                            วันที่:{" "}
                            {
                              getFormatDateTime(hook.data.reserveDate).split(
                                " "
                              )[0]
                            }{" "}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "1.25rem",
                            }}
                          >
                            เวลา:{" "}
                            {
                              getFormatDateTime(hook.data.reserveDate).split(
                                " "
                              )[1]
                            }
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Divider />
                  <Box
                    mx={3}
                    mt={3}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.25rem",
                      }}
                    >
                      จำนวนที่นั่ง:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.25rem",
                      }}
                    >
                      {hook.data.seats} ที่นั่ง
                    </Typography>
                  </Box>
                  <Box
                    mx={3}
                    mb={3}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.25rem",
                      }}
                    >
                      ราคา/ค่ามัดจำ:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.25rem",
                      }}
                    >
                      {hook.data.reservePrice.toLocaleString()} บาท
                    </Typography>
                  </Box>
                </>
              ) : (
                <ReservationDetailSkeleton />
              )}
            </Paper>
            {hook.data && hook.data.reservePrice <= 0 && (
              <Box mt={3} mb={{ xs: 6, md: 0 }}>
                <Button
                  onClick={hook.handleConfirmReserveClicked}
                  size="large"
                  fullWidth
                  variant="outlined"
                >
                  ยืนยันการจอง
                </Button>
              </Box>
            )}
          </Grid>
          <Grid mt={1} mb={{ xs: 6, md: 0 }} size={{ xs: 12, md: 6 }}>
            {hook.data && hook.data.reservePrice > 0 && (
              <>
                <Box my={{ xs: 0, md: 3 }}>
                  <h2>แนบหลักฐานการโอนเงิน</h2>
                </Box>
                <Box my={3}>
                  <Box mb={1}>
                    <UploadFileButton
                      formRef={hook.imgInputRef}
                      onChange={hook.handleFileAttach}
                      onRemoveFile={hook.handleRemoveFile}
                      fileName={hook.fileName}
                    />
                  </Box>
                  <UploadImageDisplay
                    fileName={hook.fileName}
                    blobUrl={hook.fileUrl}
                  />
                  <Box mt={3}>
                    <Button
                      disabled={Boolean(!hook.fileName)}
                      onClick={hook.handleConfirmReserveClicked}
                      size="large"
                      fullWidth
                      variant="outlined"
                    >
                      ยืนยันการจอง
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpRounded />
        </Fab>
      </ScrollTop>
      <LoadingBackdrop isLoading={hook.isLoading} />
      <ConfirmPopup
        isOpen={hook.isConfirmModalOpen}
        title={"ยืนยันการจอง"}
        text={"กรุณายืนยันการจอง กดยืนยันหากตรวจสอบหลักฐานการโอนเงินเรียบร้อย"}
        onConfirm={hook.handleReserveSubmit}
        onClose={hook.handleCloseConfirmReserve}
      />
      <InfoPopup
        isOpen={hook.isCompleteModalOpen}
        title={"การจองสำเร็จ"}
        text={`การจองสำเร็จ รอการตรวจสอบการจองจากร้านอาหาร (ตรวจสอบสถานะได้ที่แถบ "การจองของฉัน")`}
        onClose={hook.handleCloseCompleteReserve}
      />
      <InfoPopup
        isOpen={hook.isErrorModalOpen}
        title={"การจองไม่สำเร็จ"}
        text={`เกิดข้อผิดพลาดของการจอง โปรดตรวจสอบขนาดไฟล์หลักฐานการโอน (ไม่เกิน 1 MB)`}
        onClose={async () => {
          hook.toggleErrorModal();
        }}
      />
    </>
  );
};

export default MakeReservation;
