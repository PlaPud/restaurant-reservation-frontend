import React, { useEffect, useState } from "react";
import { IImageService } from "../../services/img/image-service.interface";
import useToggle from "../use-toggle";
import { delay } from "../../shared/utils/mock-utils";

const useInspectSlip = (imgService: IImageService) => {
  const { toggle: isInspectSlip, handleToggle: toggleInspectSlip } =
    useToggle(false);

  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    const resetUrlAfterClose = async () => {
      if (!isInspectSlip) {
        await delay(100);
        setImgUrl(null);
      }
    };

    resetUrlAfterClose();
  }, [isInspectSlip]);

  const handleInspectSlipClicked = async (imgPath: string) => {
    toggleInspectSlip();
    const url = await imgService.fetchImageUrl(imgPath);
    setImgUrl(url);
  };

  const handleInspectSlipClosed = async () => {
    toggleInspectSlip();
  };

  return {
    isInspectSlip,
    imgUrl,
    handleInspectSlipClicked,
    handleInspectSlipClosed,
  };
};

export default useInspectSlip;
