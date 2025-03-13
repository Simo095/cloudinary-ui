"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { RiImageAddFill } from "react-icons/ri";
import { IoImagesSharp } from "react-icons/io5";

import Loader from "./Loader";
import HeaderCloudinaryManager from "./HeaderCloudinaryManager";
import MasonryGallery from "./MasonryGallery";
import AlertModal from "./AlertModal";

import { IsMobile } from "@/redux/reducer";
import { RootState } from "@/redux/store";

const CloudinaryImageManager = () => {
  const images = useSelector((state: RootState) => state.imgReducer.images);
  const filteredImages = useSelector(
    (state: RootState) => state.imgReducer.filteredImages
  );
  const searchQuery = useSelector(
    (state: RootState) => state.imgReducer.searchQuery
  );
  const isLoading = useSelector((state: RootState) => state.imgReducer.loading);
  const isMobileOrTablet = useSelector(
    (state: RootState) => state.imgReducer.isMobileOrTablet
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      dispatch(IsMobile(width <= 781));
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, [dispatch]);

  return (
    <Container fluid className="m-0 p-0 bg-dark" style={{ minHeight: "100vh" }}>
      <HeaderCloudinaryManager isMobileOrTablet={isMobileOrTablet} />
      {isLoading ? (
        <Container fluid style={{ minHeight: "50vh" }} className="m-0 p-0 mb-2">
          <Container
            fluid
            style={{ minHeight: "50vh" }}
            className="m-0 p-0 d-flex flex-column justify-content-center align-items-center gap-2"
          >
            <Loader />
            <p className="m-0 p-0">Caricamento foto da Cloudinary...</p>
          </Container>
        </Container>
      ) : filteredImages.length !== images.length ? (
        <>
          <h4>Filtro per {searchQuery}</h4>
          <MasonryGallery images={filteredImages} />
        </>
      ) : images.length !== 0 ? (
        <MasonryGallery images={images} />
      ) : (
        <Container className="d-flex flex-column">
          <p className="m-0">
            Aggiungi le immagini usando <RiImageAddFill /> per poterle inserire
            nei progetti
          </p>
          <br />
          <p className="m-0">
            Visualizza le immagini presenti sul Gestionale usando
            <IoImagesSharp />
          </p>
        </Container>
      )}

      <AlertModal />
    </Container>
  );
};

export default CloudinaryImageManager;
