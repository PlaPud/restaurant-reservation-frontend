import { ChangeEvent, useEffect, useState } from "react";
import useToggle from "../../../hooks/use-toggle";
import { ReservationResData } from "../../../shared/interface/user";
import { IMyReservationsService } from "../services/my-reservations-service.interface";
import { ReservationPagedResponse } from "../../reservation-org/services/organize-reservation-service.interface";
import { IImageService } from "../../../services/img/image-service.interface";
import useInspectSlip from "../../../hooks/popup/use-inspect-slip";

const useMyReservations = (
  service: IMyReservationsService,
  imgService: IImageService
) => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [submittedQuery, setSubmittedQuery] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [displayItems, setDisplayItems] = useState<ReservationResData[]>([]);

  const { toggle: isLoading, handleToggle: toggleLoading } = useToggle(true);

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
    0: service.fetchPendingReservations.bind(service),
    1: service.fetchBookedReservations.bind(service),
    2: service.fetchDoneReservations.bind(service),
    3: service.fetchAllReservations.bind(service),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await tabFetchers[tabIndex](currentPage, submittedQuery);
        setDisplayItems(result.data);
        setTotalPages(result.totalPages);
      } catch (err) {
        console.error(`Cannot Fetch Data`, err);
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

    console.log(displayItems);
  }, [displayItems]);

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

  const handleQueryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setSearchQuery(value);
  };

  const handleSearchBtnClicked = async () => {
    setSubmittedQuery(searchQuery);
    await handleFetch(tabIndex, currentPage, searchQuery);
  };

  // const

  return {
    isLoading,
    isInspectSlip,
    imgUrl,
    displayItems,
    tabIndex,
    currentPage,
    totalPages,
    submittedQuery,
    searchQuery,
    handleFetch,
    handleQueryChange,
    handleSearchBtnClicked,
    handleInspectSlipClicked,
    handleInspectSlipClosed,
  };
};

export default useMyReservations;
