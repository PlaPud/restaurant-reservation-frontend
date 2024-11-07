import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToggle from "../../../hooks/use-toggle";
import { RestaurantResData } from "../../../shared/interface/user";
import { IRestaurantPageService } from "../services/restaurant-page-service.interface";
import { IImageService } from "../../../services/img/image-service.interface";

const useRestaurantPage = (
  service: IRestaurantPageService,
  imgService: IImageService
) => {
  const { restaurantId } = useParams();

  const [data, setData] = useState<RestaurantResData>(null);

  const { toggle: isLoading, handleToggle: toggleLoading } = useToggle(true);

  const { toggle: isOpenReserveModal, handleToggle: toggleReserveModal } =
    useToggle(false);

  const [imgUrl, setImgUrl] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await service.fetchRestaurant(restaurantId);
        setData(result);
      } catch (err) {
        console.error(`Cannot Fetch Data. `, err);
        setData(null);
      } finally {
        toggleLoading();
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchImgUrl = async () => {
      try {
        const result = await imgService.fetchImageUrl(data.profileImgPath);
        setImgUrl(result);
      } catch (err) {
        console.error(`Cannot Fetch Image`, err);
        setImgUrl(null);
      } finally {
      }
    };

    fetchImgUrl();
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      toggleLoading();
    }
  }, [data]);

  const handleCloseReserveModal = async () => {
    toggleReserveModal();
  };

  const handleOpenReserveModal = async () => {
    toggleReserveModal();
  };

  const handleEachReserveBtnClick = async (id: string) => {
    navigate(`./reserve/${id}`, { relative: "path" });
  };

  return {
    isLoading,
    isOpenReserveModal,
    imgUrl,
    data,
    handleCloseReserveModal,
    handleOpenReserveModal,
    handleEachReserveBtnClick,
  };
};

export default useRestaurantPage;
