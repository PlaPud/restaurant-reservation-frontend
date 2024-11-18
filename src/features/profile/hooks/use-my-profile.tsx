import React, {
  BaseSyntheticEvent,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { IUserService } from "../../../services/user/user-service.interface";
import { IImageService } from "../../../services/img/image-service.interface";
import { IMyProfileService } from "../services/my-profile-service.interface";
import useToggle from "../../../hooks/use-toggle";
import { useNavigate } from "react-router-dom";

export interface CustomerEditData {
  fName: string;
  lName: string;
  email: string;
  phone: string;
}

const useMyProfile = (
  service: IMyProfileService,
  userService: IUserService,
  imgService: IImageService
) => {
  const { toggle: isLoading, handleToggle: toggleLoading } = useToggle(true);
  const { toggle: isOpenSuccessModal, handleToggle: toggleSuccessModal } =
    useToggle(false);
  const { toggle: isOpenFailedModal, handleToggle: toggleFailedModal } =
    useToggle(false);
  const { toggle: isOpenDelConfirmModal, handleToggle: toggleDelConfirmModal } =
    useToggle(false);

  const [formData, setFormData] = useState<CustomerEditData>();

  const [fetchedData, setFetchedData] = useState<CustomerEditData | null>(null);

  const [imgPath, setImgPath] = useState("");

  const attachImgRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (imgPath.length <= 0) return;

    const fetchImgUrl = async () => {
      const url = await imgService.fetchImageUrl(imgPath);
      setFileUrl(url);
    };

    fetchImgUrl();
  }, [imgPath]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isLoading) toggleLoading();

        const data = await userService.fetchUserCustomer();
        setFetchedData({
          fName: data.fName,
          lName: data.lName,
          email: data.email,
          phone: data.phone,
        });
        setFormData({
          fName: data.fName,
          lName: data.lName,
          email: data.email,
          phone: data.phone,
        });

        setImgPath(data.profileImgPath);
      } catch (err) {
        setFormData(null);
      } finally {
        toggleLoading();
      }
    };

    fetchData();
  }, []);

  const handleInputChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitEditForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      toggleLoading();

      const result = await service.editMyProfile(
        formData,
        attachImgRef.current?.files[0]
      );

      toggleLoading();
      toggleSuccessModal();
    } catch (err) {
      toggleLoading();
      toggleFailedModal();
    }
  };

  const handleDeleteImgBtnClicked = async () => {
    toggleDelConfirmModal();
  };

  const handleDeleteProfileImg = async () => {
    try {
      toggleDelConfirmModal();

      toggleLoading();

      const result = await service.deleteProfileImg();

      toggleLoading();
      toggleSuccessModal();
    } catch (err) {
      toggleLoading();
      toggleFailedModal();
    }
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
    if (!attachImgRef.current) return;
    attachImgRef.current.value = "";
  };

  const handleCloseSuccessModal = async () => {
    toggleSuccessModal();
    navigate(0);
  };

  const handleCloseDelConfirmModal = async () => {
    toggleDelConfirmModal();
  };

  const handleCloseFailedModal = async () => {
    toggleFailedModal();
  };

  const handleBackBtnClicked = async () => {
    navigate(-1);
  };

  return {
    isLoading,
    isOpenSuccessModal,
    isOpenFailedModal,
    isOpenDelConfirmModal,
    formData,
    fetchedData,
    imgPath,
    fileName,
    fileUrl,
    attachImgRef,
    handleCloseSuccessModal,
    handleCloseFailedModal,
    handleCloseDelConfirmModal,
    handleDeleteImgBtnClicked,
    handleDeleteProfileImg,
    handleBackBtnClicked,
    handleInputChange,
    handleFileAttach,
    handleRemoveFile,
    handleSubmitEditForm,
  };
};

export default useMyProfile;
