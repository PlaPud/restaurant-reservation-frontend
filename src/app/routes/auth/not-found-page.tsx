import { SearchOff, SearchOffRounded } from "@mui/icons-material";
import { Box, Button, Container, Paper, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Paper sx={{ mt: 10, pt: 10, pb: 12 }} variant="outlined">
        <Stack alignItems={"center"} justifyContent={"center"}>
          <SearchOffRounded sx={{ fontSize: "10rem", color: grey[400] }} />
          <Box fontSize={"3rem"}>{`ไม่พบหน้านี้ :(`}</Box>
          <Box fontSize={"2rem"}>{`(Page Not Found)`}</Box>
          <Box mt={4}>
            <Link to={""} onClick={() => navigate(-1)}>
              <Button sx={{ fontSize: "2rem" }} size="large">
                ย้อนกลับ
              </Button>
            </Link>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
