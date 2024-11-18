import { ChangeEvent, useEffect, useState } from "react";
import { RestaurantResData } from "../../../shared/interface/user";
import { IRestaurantListService } from "../services/restaurant-list-service.interface";
import useToggle from "../../../hooks/use-toggle";
import { IFilterRestaurant } from "../../../shared/interface/search";
import { useNavigate } from "react-router-dom";

export interface SearchForm {
  searchQuery: string;
  filter: IFilterRestaurant;
}

const useRestaurantList = (service: IRestaurantListService) => {
  const [restaurantList, setRestaurantList] = useState<RestaurantResData[]>([]);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { toggle: isLoading, handleToggle: toggleLoading } = useToggle(true);

  const [searchForm, setSearchForm] = useState<SearchForm>({
    searchQuery: "",
    filter: {},
  });

  const [searchFormSubmit, setSearchFormSubmit] = useState<SearchForm>({
    searchQuery: "",
    filter: {},
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let resData = await service.fetchRestaurantList(page);
        setTotalPages(resData.totalPages);
        setRestaurantList(resData.data);
      } catch (err) {
        console.error("Fetching Data Error", err);
        setRestaurantList([]);
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
  }, [restaurantList]);

  const handleSearch = async (
    page: number,
    searchQuery: string,
    filter: IFilterRestaurant
  ) => {
    try {
      setPage(page);
      toggleLoading();
      const resData = await service.fetchRestaurantsWithFilter(
        page,
        searchQuery,
        filter
      );

      setTotalPages(resData.totalPages);
      setRestaurantList(resData.data);
    } catch (err) {
      console.error("Fetching Data Error", err);
      setRestaurantList([]);
    } finally {
      toggleLoading();
    }
  };

  const handleFilterChange = async (filter: IFilterRestaurant) =>
    setSearchForm({ ...searchForm, filter });

  const handleQueryChange = async (name: string, value: string) =>
    setSearchForm({
      ...searchForm,
      [name]: value,
    });

  const handleSubmitSearchForm = async () => {
    setSearchFormSubmit({ ...searchForm });
  };

  const handleEachCardBtnClicked = async (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  return {
    isLoading,
    restaurantList,
    page,
    totalPages,
    searchForm,
    searchFormSubmit,
    handleFilterChange,
    handleQueryChange,
    handleSubmitSearchForm,
    handleEachCardBtnClicked,
    handleSearch,
  };
};

export default useRestaurantList;
