import { filterImages, isLoad, showAlert, updateImages } from "@/redux/reducer";

export const handleUpload = async (file, customName, dispatch, setPreview) => {
  if (!file) {
    dispatch(showAlert("Seleziona un file da caricare...", "error"));
    return;
  }
  setPreview(URL.createObjectURL(file[0]));
  if (customName === "Nominami...ah" || customName === "") {
    dispatch(showAlert("Nome Foto Necessario...", "error"));
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
      dispatch(showAlert(customName + " Caricata con Successo!"));
      dispatch(isLoad(true));

      try {
        const response = await fetch("/api/cloudinary/get_images");
        const data = await response.json();
        dispatch(updateImages(data || []));
      } catch (error) {
        dispatch(
          showAlert("Errore /api/cloudinary/get_images " + error, "error")
        );
      } finally {
        dispatch(isLoad(false));
      }
    } else {
      dispatch(
        showAlert(
          "Qualcosa non ha funzionato nel caricamento... " +
            JSON.stringify(data),
          "error"
        )
      );
    }
  } catch (error) {
    dispatch(showAlert("Errore /api/cloudinary/upload_image" + error, "error"));
  } finally {
    dispatch(isLoad(false));
  }
};

export const fetchImages = async (dispatch) => {
  dispatch(isLoad(true));
  try {
    const response = await fetch("api/cloudinary/get_images");
    const data = await response.json();
    dispatch(updateImages(data || []));
  } catch (error) {
    dispatch(showAlert("Errore /api/cloudinary/get_images " + error, "error"));
  } finally {
    dispatch(isLoad(false));
  }
};

export const handleSearch = (e, setQuery, dispatch) => {
  setQuery(e.target.value);
  dispatch(filterImages(e.target.value));
};

export const handleRenameImage = async (public_id, dispatch, rename) => {
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
      dispatch(showAlert("Foto Rinominata"));
      fetchImages(dispatch);
    } else {
      dispatch(
        showAlert("Errore /api/cloudinary/rename_image " + data.error, "error")
      );
    }
  } catch (error) {
    dispatch(
      showAlert("Errore /api/cloudinary/rename_image " + error, "error")
    );
  }
};
export const handleDeleteImage = async (public_id, dispatch, images) => {
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
      dispatch(showAlert("Immagine Eliminata"));
      dispatch(
        updateImages(images.filter((image) => image.public_id !== public_id))
      );
    } else {
      dispatch(
        showAlert("Errore /api/cloudinary/delete_image" + data.error, "error")
      );
    }
  } catch (error) {
    dispatch(showAlert("Errore /api/cloudinary/delete_image" + error, "error"));
  }
};
