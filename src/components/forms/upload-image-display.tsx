import { Image } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { grey } from "@mui/material/colors";

interface Props {
  fileName: string;
  blobUrl: string;
}

const UploadImageDisplay = (props: Props) => {
  const { fileName, blobUrl } = props;

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "250px",
        maxHeight: "500px",
        color: grey.A400,
      }}
      variant="outlined"
    >
      {fileName ? (
        <img
          style={{
            objectFit: "scale-down",
            minHeight: "250px",
            maxHeight: "500px",
          }}
          src={blobUrl}
        />
      ) : (
        <>
          <Image />
          ยังไม่มีการอัพโหลดรูป
        </>
      )}
    </Paper>
  );
};

export default UploadImageDisplay;
