import { Cancel, Upload } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import React, { useState } from "react";

const UploadFileButton = ({ formRef, onChange, onRemoveFile, fileName }) => {
  return (
    <>
      <label htmlFor="upload-file-btn">
        <Button
          component="span"
          color="info"
          fullWidth
          size="large"
          variant="outlined"
          endIcon={<Upload />}
        >
          อัพโหลดไฟล์ .jpg .png
        </Button>
      </label>
      <input
        ref={formRef}
        id="upload-file-btn"
        style={{ display: "none" }}
        color="info"
        type="file"
        accept="image/*"
        onChange={onChange}
      />
      {fileName && (
        <span>
          <span>{fileName}</span>
          <IconButton onClick={onRemoveFile}>
            <Cancel />
          </IconButton>
        </span>
      )}
      <Box
        mt={2}
        fontStyle="italic"
        sx={{
          color: "grey",
        }}
      >
        *ขนาดไฟล์ไม่เกิน 1 MB
      </Box>
    </>
  );
};

export default UploadFileButton;
