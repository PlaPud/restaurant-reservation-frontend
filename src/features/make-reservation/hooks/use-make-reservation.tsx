import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import {
  CustomerResData,
  ReservationResData,
} from "../../../shared/interface/user";

import { useNavigate, useParams } from "react-router-dom";
import useToggle from "../../../hooks/use-toggle";
import { IMakeReservationService } from "../services/make-reservation-service.interface";
import { IUserService } from "../../../services/user/user-service.interface";

const useMakeReservation = (
  service: IMakeReservationService,
  userService: IUserService
) => {
  const { restaurantId, reserveId } = useParams();

  const [data, setData] = useState<ReservationResData>(null);
  const [userData, setUserData] = useState<CustomerResData>(null);

  const { toggle: isLoading, handleToggle: toggleLoading } = useToggle(true);

  const { toggle: isConfirmModalOpen, handleToggle: toggleConfirmModal } =
    useToggle(false);

  const { toggle: isCompleteModalOpen, handleToggle: toggleCompleteModal } =
    useToggle(false);
  const { toggle: isErrorModalOpen, handleToggle: toggleErrorModal } =
    useToggle(false);

  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all([
          service.fetchReservation(reserveId),
          userService.fetchUserCustomer(),
        ]);
        setData(results[0]);
        setUserData(results[1]);
      } catch (err) {
        console.error(`Cannot Fetch Data. `, err);
        setData(null);
        setUserData(null);
      } finally {
        toggleLoading();
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isLoading) {
      toggleLoading();
    }
  }, [data]);

  const handleReturnClicked = async () => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const handleFileAttach = async (e: BaseSyntheticEvent) => {
    const file = e.target.files[0];

    setFileName(file.name);
    const blobUrl = URL.createObjectURL(file);
    setFileUrl(blobUrl);
  };

  const handleRemoveFile = async () => {
    setFileName(null);
    setFileUrl(null);
    if (!imgInputRef.current) return;
    imgInputRef.current.value = "";
  };

  const handleConfirmReserveClicked = async () => {
    toggleConfirmModal();
  };

  const handleCloseConfirmReserve = async () => {
    toggleConfirmModal();
  };

  const handleCloseCompleteReserve = async () => {
    toggleCompleteModal();
    navigate(`/restaurant/${restaurantId}`, { replace: true });
  };

  const handleReserveSubmit = async () => {
    toggleConfirmModal();

    toggleLoading();

    const result = await service.makeReservation(
      reserveId,
      imgInputRef.current?.files[0]
    );

    toggleLoading();

    if (result) {
      toggleCompleteModal();
      return;
    }

    toggleErrorModal();
  };

  return {
    isLoading,
    isConfirmModalOpen,
    isCompleteModalOpen,
    isErrorModalOpen,
    data,
    userData,
    imgInputRef,
    fileName,
    fileUrl,
    handleReturnClicked,
    handleFileAttach,
    handleRemoveFile,
    handleConfirmReserveClicked,
    handleCloseConfirmReserve,
    handleCloseCompleteReserve,
    handleReserveSubmit,
    toggleCompleteModal,
    toggleErrorModal,
  };
};

export default useMakeReservation;
