import {
  DateTimeValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { ChangeEvent, useEffect, useState } from "react";
import useToggle from "../../../hooks/use-toggle";
import { DEFAULT_FORM_RESERVE } from "../../../shared/constants";
import { ReservationResData } from "../../../shared/interface/user";
import { ReservationFormData } from "../components/create-reserve-modal";
import {
  IOrganizeReservationService,
  ReservationCreateData,
  ReservationPagedResponse,
} from "../services/organize-reservation-service.interface";
import useInspectSlip from "../../../hooks/popup/use-inspect-slip";
import { IImageService } from "../../../services/img/image-service.interface";

const useOrganizeReservation = (
  service: IOrganizeReservationService,
  imgService: IImageService
) => {
  const [tabIndex, setTabIndex] = useState<number>(1);

  const [formData, setFormData] =
    useState<ReservationFormData>(DEFAULT_FORM_RESERVE);

  const [editFormData, setEditFormData] =
    useState<ReservationFormData>(DEFAULT_FORM_RESERVE);

  const [displayItems, setDisplayItems] = useState<ReservationResData[]>([]);

  const [selectedItem, setSelectedItem] = useState(null);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [totalPages, setTotalPages] = useState<number>(1);

  const { toggle: isLoading, handleToggle: toggleLoading } = useToggle(true);
  const { toggle: isCreateModalOpen, handleToggle: toggleCreateModal } =
    useToggle(false);
  const { toggle: isDeleteModalOpen, handleToggle: toggleDeleteModal } =
    useToggle(false);
  const { toggle: isCancelModalOpen, handleToggle: toggleCancelModal } =
    useToggle(false);
  const { toggle: isEditModalOpen, handleToggle: toggleEditModal } =
    useToggle(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQSubmit, setSearchQsubmit] = useState<string>("");

  const {
    isInspectSlip,
    imgUrl,
    handleInspectSlipClicked,
    handleInspectSlipClosed,
  } = useInspectSlip(imgService);

  const tabFetchers: Record<
    number,
    (page: number, searchQuery: string) => Promise<ReservationPagedResponse>
  > = {
    0: service.fetchAvailableReservations.bind(service),
    1: service.fetchPendingReservations.bind(service),
    2: service.fetchSuccessReservations.bind(service),
    3: service.fetchDoneReservations.bind(service),
    4: service.fetchAllReservations.bind(service),
  };

  useEffect(() => {
    console.log(searchQSubmit);
  }, [searchQSubmit]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await tabFetchers[tabIndex](currentPage, searchQuery);
        setDisplayItems(result.data);
        setTotalPages(result.totalPages);
      } catch (err) {
        console.error(`Cannot Fetch Data. `, err);
        setDisplayItems([]);
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
  }, [displayItems]);

  const handleTextFormChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: Number(value),
    });
  };

  const handleTextFormChangeEdit = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setEditFormData({
      ...editFormData,
      [name]: Number(value),
    });
  };

  const handleDateChange = (
    value: Date,
    context: PickerChangeHandlerContext<DateTimeValidationError>
  ) => {
    setFormData({
      ...formData,
      reserveDate: value.getTime(),
    });
  };

  const handleDateChangeEdit = (
    value: Date,
    context: PickerChangeHandlerContext<DateTimeValidationError>
  ) => {
    setEditFormData({
      ...editFormData,
      reserveDate: value.getTime(),
    });
  };

  const handleQueryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    const { name, value } = e.target;

    setSearchQuery(value);
  };

  const handleSearchBtnClicked = async () => {
    setSearchQsubmit(searchQuery);
    await handleFetch(tabIndex, currentPage, searchQuery);
  };

  const handleCreateBtnClicked = async () => {
    toggleCreateModal();
  };

  const handleApprovePayment = async (reservation: ReservationResData) => {
    setSelectedItem(reservation);
    toggleLoading();

    const result = await service.approveReservation(reservation.reserveId);
    setSelectedItem(null);

    toggleLoading();
    console.log(result);

    await handleFetch(1, 1, "");
  };

  const handleCheckAttended = async (reservation: ReservationResData) => {
    setSelectedItem(reservation);
    toggleLoading();

    const result = await service.checkAttendReservation(reservation.reserveId);
    setSelectedItem(null);

    toggleLoading();
    console.log(result);

    await handleFetch(2, 1, "");
  };

  const handleCancelReserve = async (reservation: ReservationResData) => {
    setSelectedItem(reservation);
    toggleCancelModal();
  };

  const handleCancelAttend = async (reservation: ReservationResData) => {
    setSelectedItem(reservation);
    toggleCancelModal();
  };

  const handleEditBtnClicked = async (reservation: ReservationResData) => {
    setSelectedItem(reservation);
    setEditFormData({
      seats: reservation.seats,
      reservePrice: reservation.reservePrice,
      reserveDate: reservation.reserveDate * 1000,
    });
    toggleEditModal();
  };

  const handleDeleteBtnClicked = async (reservation: ReservationResData) => {
    setSelectedItem(reservation);
    toggleDeleteModal();
  };

  const handleConfirmEdit = async () => {
    const editted: ReservationResData = {
      ...selectedItem,
      seats: editFormData.seats,
      reservePrice: editFormData.reservePrice,
      reserveDate: Math.floor(editFormData.reserveDate / 1000),
    };

    const { restaurant, customer, ...body } = editted;

    toggleEditModal();
    toggleLoading();
    const result = await service.editReservation(selectedItem.reserveId, body);
    setFormData(DEFAULT_FORM_RESERVE);
    console.log(result);
    setSelectedItem(null);
    toggleLoading();
    await handleFetch(tabIndex, currentPage, "");
  };

  const handleConfirmDelete = async () => {
    toggleDeleteModal();
    toggleLoading();
    await service.deleteReservation(selectedItem.reserveId);
    setSelectedItem(null);
    toggleLoading();

    await handleFetch(0, 1, "");
  };

  const handleConfirmCancel = async () => {
    toggleCancelModal();
    toggleLoading();
    await service.cancelReservation(selectedItem.reserveId);
    setSelectedItem(null);
    toggleLoading();

    await handleFetch(0, 1, "");
  };

  const handleCloseDelModal = async () => {
    setSelectedItem(null);
    toggleDeleteModal();
  };

  const handleCloseCancelModal = async () => {
    setSelectedItem(null);
    toggleCancelModal();
  };

  const handleCloseModal = async () => {
    toggleCreateModal();
  };

  const handleCloseEditModal = async () => {
    setSelectedItem(null);
    toggleEditModal();
  };

  const handleSubmitReserve = async () => {
    const body: ReservationCreateData = {
      seats: formData.seats,
      reservePrice: formData.reservePrice,
      reserveDate: Math.floor(formData.reserveDate / 1000),
    };

    toggleCreateModal();
    toggleLoading();
    const result = await service.createReservation(body);
    setFormData(DEFAULT_FORM_RESERVE);
    console.log(result);
    toggleLoading();

    await handleFetch(0, 1, "");
  };

  const handleFetch = async (
    tab: number,
    page: number,
    searchQuery: string
  ) => {
    setTabIndex(tab);
    setCurrentPage(page);
    toggleLoading();
    try {
      let result: ReservationPagedResponse;

      result = await tabFetchers[tab](page, searchQuery);

      setTotalPages(result.totalPages);
      setDisplayItems(result.data);
    } catch (err) {
      setDisplayItems([]);
    } finally {
      toggleLoading();
    }
  };

  return {
    formData,
    editFormData,
    isLoading,
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    isCancelModalOpen,
    isInspectSlip,
    tabIndex,
    displayItems,
    currentPage,
    totalPages,
    searchQuery,
    searchQSubmit,
    imgUrl,
    handleSearchBtnClicked,
    handleInspectSlipClicked,
    handleCreateBtnClicked,
    handleEditBtnClicked,
    handleDeleteBtnClicked,
    handleApprovePayment,
    handleCheckAttended,
    handleCancelReserve,
    handleConfirmCancel,
    handleCancelAttend,
    handleTextFormChange,
    handleTextFormChangeEdit,
    handleDateChange,
    handleDateChangeEdit,
    handleCloseModal,
    handleCloseDelModal,
    handleCloseCancelModal,
    handleCloseEditModal,
    handleInspectSlipClosed,
    handleFetch,
    handleQueryChange,
    handleSubmitReserve,
    handleConfirmEdit,
    handleConfirmDelete,
  };
};

export default useOrganizeReservation;
