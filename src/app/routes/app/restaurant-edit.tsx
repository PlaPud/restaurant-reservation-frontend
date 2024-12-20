import {
  Box,
  Button,
  Container,
  Grid2 as Grid,
  Paper,
  TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import RestaurantDataForm from "../../../components/forms/group/restaurant-data-form";
import UploadFileButton from "../../../components/forms/upload-file-button";
import RestaurantCoverCard from "../../../features/restaurant-edit/components/restaurant-cover-card";
import useRestaurantEditService from "../../../features/restaurant-edit/hooks/service/use-restaurant-edit-service";
import useRestaurantEdit from "../../../features/restaurant-edit/hooks/use-restaurant-edit";
import useImageService from "../../../hooks/services/use-image-service";
import useThaiAddressService from "../../../hooks/services/use-thai-address-service";
import useUserService from "../../../hooks/services/use-user-service";

const RestaurantEdit = () => {
  const service = useRestaurantEditService();
  const userService = useUserService();
  const imgService = useImageService();
  const thaiAddressService = useThaiAddressService();

  const {
    formData,
    imgUrl,
    fileName,
    imgFileRef,
    preFetchedProvinces,
    fetchedDistricts,
    fetchedSubDists,
    selectedAddress,
    isDataChanged,
    handleTextInputChange,
    handleChangeProvince,
    handleChangeDistrict,
    handleChangeSubDistrict,
    handleFileAttach,
    handleRemoveFile,
    handleDeleteCover,
    handleCancelBtnClicked,
    handleSubmitRestaurant,
  } = useRestaurantEdit(service, userService, imgService, thaiAddressService);

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
            cover={imgUrl}
            title={formData ? formData.name : "กำลังโหลดข้อมูล"}
            addressString={
              formData
                ? `${formData.address}, ${formData.district} (${formData.province})`
                : ""
            }
          />
          <Box>
            <Container maxWidth="md">
              <Grid mt={3} container spacing={4}>
                <Grid size={{ xs: 12, md: 8 }}>
                  <Box mb={3}>
                    <h2>แก้ไขข้อมูลร้าน</h2>
                  </Box>
                  <RestaurantDataForm
                    onChange={handleTextInputChange}
                    subDistrictItems={fetchedSubDists}
                    districtItems={fetchedDistricts}
                    provinceItems={preFetchedProvinces}
                    onChangeSubDistrict={handleChangeSubDistrict}
                    onChangeDistrict={handleChangeDistrict}
                    onChangeProvince={handleChangeProvince}
                    selectedAddressItems={selectedAddress}
                    includePassword={false}
                    data={formData}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <h2>อัพโหลดรูปปกร้าน</h2>
                  <Box mt={3}>
                    <UploadFileButton
                      fileName={fileName}
                      formRef={imgFileRef}
                      onChange={handleFileAttach}
                      onRemoveFile={handleRemoveFile}
                    />
                  </Box>
                  <Box mt={3}>
                    <Button
                      onClick={handleDeleteCover}
                      color="error"
                      variant="outlined"
                    >
                      ลบรูปปกร้าน
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <Box mb={4}>
                <h2>คำอธิบายร้าน</h2>
                <Box mt={2}>
                  <TextField
                    name="description"
                    onChange={handleTextInputChange}
                    defaultValue={formData ? formData.description : ""}
                    placeholder="เพิ่มคำอธิบายเกี่ยวกับร้านอาหาร"
                    fullWidth
                    multiline
                    rows={2}
                  />
                </Box>
              </Box>
              <Box mb={4}>
                <h2>ช่องทางการชำระเงิน</h2>
                <Box mt={2}>
                  <TextField
                    name="paymentInfo"
                    onChange={handleTextInputChange}
                    defaultValue={formData ? formData.paymentInfo : ""}
                    placeholder="เพิ่มข้อมูลการชำระเงิน"
                    fullWidth
                    multiline
                    rows={1}
                  />
                </Box>
              </Box>
              <Box mb={6}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Button
                      fullWidth
                      color="secondary"
                      variant="contained"
                      onClick={handleSubmitRestaurant}
                      disabled={!isDataChanged()}
                    >
                      บันทึกการแก้ไข
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Button
                      fullWidth
                      color="primary"
                      variant="outlined"
                      onClick={handleCancelBtnClicked}
                    >
                      ยกเลิก
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default RestaurantEdit;
