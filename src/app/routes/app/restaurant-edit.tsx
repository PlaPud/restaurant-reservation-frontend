import { Upload } from "@mui/icons-material";
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
import RestaurantCoverCard from "../../../features/restaurant-edit/components/restaurant-cover-card";
import UploadFileButton from "../../../components/forms/upload-file-button";
import useRestaurantEdit from "../../../features/restaurant-edit/hooks/use-restaurant-edit";
import temp_cover from "E:/PlaPud/Code/restaurant-reserve-frontend/src/assets/restaurant/restaurant-img-1.jpg";
import { useNavigate } from "react-router-dom";

const RestaurantEdit = () => {
  const {
    formData,
    imgUrl,
    fileName,
    fileFormRef,
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
  } = useRestaurantEdit();

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
                      formRef={fileFormRef}
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
