import {
  BaseSyntheticEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import useSelectAddress from "../../../hooks/use-select-address";
import { ThaiAddressAxiosService } from "../../../services/address/thai-address-axios-service";
import useRestEditForm from "./use-rest-edit-form";
import useRestaurantEditService from "./service/use-restaurant-edit-service";
import {
  District,
  Province,
  SubDistrict,
} from "../../../shared/interface/address";
import useImageService from "../../../hooks/services/use-image-service";
import { useNavigate } from "react-router-dom";

const useRestaurantEdit = () => {
  const addressService = new ThaiAddressAxiosService();
  const service = useRestaurantEditService();
  const imgService = useImageService();

  const navigate = useNavigate();

  const {
    originalData,
    formData,
    imgPath,
    preFetchedProvinces,
    fetchedDistricts,
    fetchedSubDists,
    selectedAddress,
    setSelectedAddress,
    handleTextInputChange,
    handleChangeProvince,
    handleChangeDistrict,
    handleChangeSubDistrict,
    clearFormFields,
  } = useRestEditForm(addressService, service);

  const [fileName, setFileName] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState("");

  const fileFormRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (imgPath === "") return;
    const fetchUrl = async () => {
      try {
        setImgUrl(await imgService.fetchImageUrl(imgPath));
      } catch (err) {
        console.log(err);
      }
    };

    fetchUrl();
  }, [imgPath]);

  useEffect(() => {
    if (!formData || !preFetchedProvinces) return;

    setItemProvince(formData.province);
  }, [preFetchedProvinces]);

  useEffect(() => {
    if (!formData || !formData?.province || !fetchedDistricts) return;
    setItemDistrict(formData.district);
  }, [fetchedDistricts, selectedAddress.province]);

  useEffect(() => {
    if (!formData || !formData?.district || !fetchedSubDists) return;
    setItemSubDistrict(formData.subDistrict);
  }, [fetchedSubDists, selectedAddress.subDistrict]);

  useEffect(() => {
    console.log(selectedAddress);
  }, [selectedAddress.province]);

  const handleFileAttach = (e: BaseSyntheticEvent) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
  };

  const handleRemoveFile = () => {
    setFileName(null);
    if (!fileFormRef.current) return;
    fileFormRef.current.value = "";
  };

  const handleDeleteCover = async () => {
    await service.deleteProfileImg();
    navigate(0);
  };

  const handleSubmitRestaurant = async () => {
    const res = await service.updateRestaurant(
      formData,
      fileFormRef.current?.files[0]
    );
    navigate(0);
  };

  const handleCancelBtnClicked = () => {
    navigate("/home");
  };

  const setItemProvince = (name_th: string): Province => {
    const result = preFetchedProvinces?.find(
      (item: Province) => item.name_th === name_th
    );

    if (!result) return;

    setSelectedAddress({ ...selectedAddress, province: result });

    return result;
  };

  const setItemDistrict = (name_th: string): District => {
    const result = fetchedDistricts?.find(
      (item: District) => item.name_th === name_th
    );

    if (!result) return;

    setSelectedAddress({ ...selectedAddress, district: result });

    return result;
  };

  const setItemSubDistrict = (name_th: string): SubDistrict => {
    const result = fetchedSubDists?.find(
      (item: SubDistrict) => item.name_th === name_th
    );

    if (!result) return;

    setSelectedAddress({ ...selectedAddress, subDistrict: result });

    return result;
  };

  const isDataChanged = (): boolean =>
    JSON.stringify(formData) !== JSON.stringify(originalData) ||
    Boolean(fileName);

  return {
    formData,
    imgUrl,
    fileName,
    fileFormRef,
    preFetchedProvinces,
    fetchedDistricts,
    fetchedSubDists,
    selectedAddress,
    isDataChanged,

    setSelectedAddress,
    handleTextInputChange,
    handleChangeProvince,
    handleChangeDistrict,
    handleChangeSubDistrict,
    handleFileAttach,
    handleRemoveFile,
    handleDeleteCover,
    handleCancelBtnClicked,
    clearFormFields,

    handleSubmitRestaurant,
  };
};

export default useRestaurantEdit;
