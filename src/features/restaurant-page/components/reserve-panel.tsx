import { EventAvailable } from "@mui/icons-material";
import { Box, Button, Paper } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

interface Props {
  available: number;
  onReserveBtnClicked: () => Promise<void>;
}

const ReservePanel = (props: Props) => {
  const { available, onReserveBtnClicked } = props;

  return (
    <>
      <Paper
        sx={{
          px: 2,
          py: 0.5,
          height: "150px",
          backgroundColor: grey.A100,
        }}
        variant="outlined"
      >
        <Box textAlign={"center"}>
          {available > 0 ? (
            <h3>ยังไม่ได้จองคิวร้านนี้? (เหลือ {available} คิว)</h3>
          ) : (
            <h3 style={{ color: "darkred" }}>ร้านนี้คิวเต็มแล้ว!</h3>
          )}
        </Box>
        <Box mt={2}>
          <Button
            onClick={onReserveBtnClicked}
            disabled={available <= 0}
            sx={{
              height: "4rem",
            }}
            fullWidth
            size="large"
            startIcon={<EventAvailable />}
            variant="outlined"
          >
            จองคิวที่นี่
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default ReservePanel;
