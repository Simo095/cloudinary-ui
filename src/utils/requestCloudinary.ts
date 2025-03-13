import {
  filterImages,
  Img,
  isLoad,
  showAlert,
  updateImages,
} from "@/redux/reducer";
import { AppDispatch } from "@/redux/store";
import { ChangeEvent } from "react";

export const handleUpload = async (
  file: File[],
  customName: string,
  dispatch: AppDispatch,
  setPreview: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (!file) {
    dispatch(
      showAlert({
        show: true,
        message: "Seleziona un file da caricare...",
        alertType: "error",
      })
    );
    return;
  }
  setPreview(URL.createObjectURL(file[0]));
  if (customName === "Nominami...ah" || customName === "") {
    dispatch(
      showAlert({
        show: true,
        message: "Nome Foto Necessario...",
        alertType: "error",
      })
    );
    return;
  }

  const formData = new FormData();
  formData.append("file", file[0]);
  formData.append("public_id", customName);

  dispatch(isLoad(true));

  try {
    const response = await fetch("/api/cloudinary/upload_image", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.secure_url) {
      dispatch(
        showAlert({
          show: true,
          message: customName + " Caricata con Successo!",
          alertType: "info",
        })
      );
      dispatch(isLoad(true));

      try {
        const response = await fetch("/api/cloudinary/get_images");
        const data = await response.json();
        dispatch(updateImages(data || []));
      } catch (error) {
        dispatch(
          showAlert({
            show: true,
            message: "Errore /api/cloudinary/get_images " + error,
            alertType: "error",
          })
        );
      } finally {
        dispatch(isLoad(false));
      }
    } else {
      dispatch(
        showAlert({
          show: true,
          message:
            "Qualcosa non ha funzionato nel caricamento... " +
            JSON.stringify(data),
          alertType: "error",
        })
      );
    }
  } catch (error) {
    dispatch(
      showAlert({
        show: true,
        message: "Errore /api/cloudinary/upload_image" + error,
        alertType: "error",
      })
    );
  } finally {
    dispatch(isLoad(false));
  }
};

export const fetchImages = async (dispatch: AppDispatch) => {
  dispatch(isLoad(true));
  try {
    const response = await fetch("api/cloudinary/get_images");
    const data = await response.json();
    dispatch(updateImages(data || []));
  } catch (error) {
    dispatch(
      showAlert({
        show: true,
        message: "Errore /api/cloudinary/get_images " + error,
        alertType: "error",
      })
    );
  } finally {
    dispatch(isLoad(false));
  }
};

export const handleSearch = (
  e: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  dispatch: AppDispatch
) => {
  setQuery(e);
  dispatch(filterImages(e));
};

export const handleRenameImage = async (
  public_id: string,
  dispatch: AppDispatch,
  rename: string
) => {
  try {
    const response = await fetch("/api/cloudinary/rename_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id, rename }),
    });

    const data = await response.json();
    if (response.ok) {
      dispatch(
        showAlert({
          show: true,
          message: "Foto Rinominata",
          alertType: "info",
        })
      );
      fetchImages(dispatch);
    } else {
      dispatch(
        showAlert({
          show: true,
          message: "Errore /api/cloudinary/rename_image " + data.error,
          alertType: "error",
        })
      );
    }
  } catch (error) {
    dispatch(
      showAlert({
        show: true,
        message: "Errore /api/cloudinary/rename_image " + error,
        alertType: "error",
      })
    );
  }
};
export const handleDeleteImage = async (
  public_id: string,
  dispatch: AppDispatch,
  images: Img[]
) => {
  try {
    const response = await fetch("/api/cloudinary/delete_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id }),
    });

    const data = await response.json();
    if (response.ok) {
      dispatch(
        showAlert({
          show: true,
          message: "Immagine Eliminata",
          alertType: "info",
        })
      );
      dispatch(
        updateImages(
          images.filter((image: Img) => image.public_id !== public_id)
        )
      );
    } else {
      dispatch(
        showAlert({
          show: true,
          message: "Errore /api/cloudinary/delete_image" + data.error,
          alertType: "error",
        })
      );
    }
  } catch (error) {
    dispatch(
      showAlert({
        show: true,
        message: "Errore /api/cloudinary/delete_image" + error,
        alertType: "error",
      })
    );
  }
};
