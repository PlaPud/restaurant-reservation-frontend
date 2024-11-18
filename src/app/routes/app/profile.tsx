import { ArrowBackRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid2 as Grid,
  Paper,
  Stack,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { BaseSyntheticEvent, ChangeEvent, FormEvent } from "react";
import CustomerDataForm from "../../../components/forms/group/customer-data-form";
import UploadFileButton from "../../../components/forms/upload-file-button";
import LoadingBackdrop from "../../../components/loading/loading-backdrop";
import InfoPopup from "../../../components/popup/info-popup";
import useMyProfileService from "../../../features/profile/hooks/service/use-my-profile-service";
import useMyProfile, {
  CustomerEditData,
} from "../../../features/profile/hooks/use-my-profile";
import useImageService from "../../../hooks/services/use-image-service";
import useUserService from "../../../hooks/services/use-user-service";
import { CUSTOMER_PLACEHOLDER_IMG } from "../../../shared/constants";
import ConfirmPopup from "../../../components/popup/confirm-popup";

const MyProfile = () => {
  const userService = useUserService();
  const service = useMyProfileService();
  const imgService = useImageService();
  const hook = useMyProfile(service, userService, imgService);

  return (
    <>
      <Container>
        <Box mt={3}>
          <Button
            sx={{
              fontSize: "1.2rem",
            }}
            size="large"
            startIcon={<ArrowBackRounded />}
            onClick={hook.handleBackBtnClicked}
          >
            ย้อนกลับ
          </Button>
        </Box>
        <Grid mt={3} container spacing={2} alignItems={"center"}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack alignItems={"center"} my={2}>
              <Paper
                variant="outlined"
                sx={{
                  width: "300px",
                  height: "300px",
                  backgroundColor: grey.A100,
                  borderRadius: "50%",
                }}
                component={"img"}
                src={
                  hook.fileUrl?.length > 0
                    ? hook.fileUrl
                    : CUSTOMER_PLACEHOLDER_IMG
                }
              ></Paper>
              <Box>
                <h3>รูปโปรไฟล์ของคุณ</h3>
              </Box>
              <Box mt={4}>
                {uploadProfileImgButtons(
                  hook.attachImgRef,
                  hook.fileName,
                  hook.handleFileAttach,
                  hook.handleRemoveFile,
                  hook.handleDeleteImgBtnClicked
                )}
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box mb={4}>
              <h2>แก้ไขข้อมูลส่วนตัว</h2>
            </Box>
            <Paper
              sx={{
                px: 6,
                py: 4,
                mt: 2,
                mb: 8,
                backgroundColor: grey.A100,
              }}
            >
              {editProfileForm(
                hook.formData,
                hook.handleInputChange,
                hook.handleSubmitEditForm
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <LoadingBackdrop isLoading={hook.isLoading} />
      <InfoPopup
        isOpen={hook.isOpenSuccessModal}
        title={"สำเร็จ"}
        text={"อัพเดทข้อมูลสำเร็จ"}
        onClose={hook.handleCloseSuccessModal}
      />
      <InfoPopup
        isOpen={hook.isOpenFailedModal}
        title={"เกิดข้อผิดพลาด"}
        text={"ไม่สามารถอัพเดทรายละเอียดได้ กรุณาลองใหม่"}
        onClose={hook.handleCloseFailedModal}
      />
      <ConfirmPopup
        isOpen={hook.isOpenDelConfirmModal}
        title={"ลบรูปโปรไฟล์"}
        text={"กดยืนยัน หากต้องการลบรูปโปรไฟล์ของคุณ"}
        onConfirm={hook.handleDeleteProfileImg}
        onClose={hook.handleCloseDelConfirmModal}
      />
    </>
  );
};

const uploadProfileImgButtons = (
  attachImgRef,
  fileName: string,
  onAttachImg: (e: BaseSyntheticEvent) => Promise<void>,
  onRemoveImg: () => Promise<void>,
  onDeleteImgBtnClicked: () => Promise<void>
) => {
  return (
    <>
      <UploadFileButton
        formRef={attachImgRef}
        onChange={onAttachImg}
        onRemoveFile={onRemoveImg}
        fileName={fileName}
      />
      <Button
        sx={{
          mt: 2,
          fontSize: "1.1rem",
        }}
        fullWidth
        size="large"
        variant="outlined"
        color="error"
        onClick={onDeleteImgBtnClicked}
      >
        ลบรูปโปรไฟล์
      </Button>
    </>
  );
};

const editProfileForm = (
  formData: CustomerEditData,
  handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => Promise<void>,
  handleSubmitEditForm: (e: FormEvent) => Promise<void>
) => {
  return (
    <Stack component={"form"} onSubmit={handleSubmitEditForm}>
      <CustomerDataForm
        onChange={handleInputChange}
        data={formData}
        includePassword={false}
      />
      <Box mt={6}>
        <Button
          sx={{
            fontSize: "1.1rem",
          }}
          variant="outlined"
          fullWidth
          size="large"
          type="submit"
        >
          บันทึกการแก้ไข
        </Button>
      </Box>
    </Stack>
  );
};

export default MyProfile;
