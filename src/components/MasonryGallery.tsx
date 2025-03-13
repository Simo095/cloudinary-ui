"use client";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Masonry from "react-masonry-css";
import {
  handleDeleteImage,
  handleRenameImage,
} from "../utils/requestCloudinary";
import { Container, Image, Modal } from "react-bootstrap";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import "../css/MasonryGallery.css";
import { Img } from "@/redux/reducer";
interface MasonryGalleryProps {
  images: Img[];
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ images }) => {
  const breakpointColumnsObj = {
    default: 4,
    1024: 4,
    768: 3,
    480: 1,
  };
  const dispatch = useDispatch();
  const [renameId, setRenameId] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleRename = (id: string) => {
    handleRenameImage(id, dispatch, renameValue);
    setRenameId(null);
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-column"
      >
        {images.map((image: any) => (
          <div key={image.public_id} className="position-relative">
            <Container fluid className="position-relative">
              <Image
                src={image.url}
                alt={`Foto ${image.public_id}`}
                className="w-100 rounded shadow-lg mb-3"
                style={{ display: "block" }}
              />
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end justify-content-center bg-dark bg-opacity-50"
                style={{ opacity: 0, transition: "opacity 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
              >
                {renameId === image.public_id ? (
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                    />
                    <button className="btn btn-success btn-sm m-0 p-0">
                      <IoCheckmark
                        size={20}
                        onClick={() => {
                          handleRename(image.public_id);
                        }}
                      />
                    </button>
                    <button className="btn btn-danger btn-sm m-0 p-0">
                      <IoCloseOutline
                        size={20}
                        onClick={() => {
                          setRenameId(null);
                          setRenameValue(image.public_id);
                        }}
                      />
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedImage(image.url)}
                      className="btn btn-light m-0 p-4 border-0"
                    >
                      <FaEye size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setRenameId(image.public_id);
                        setRenameValue(image.public_id);
                      }}
                      className="btn btn-warning m-0 p-4 border-0"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteImage(image.public_id, dispatch, images)
                      }
                      className="btn btn-danger m-0 p-4 border-0"
                    >
                      <FaTrash size={20} />
                    </button>
                  </>
                )}
              </div>
            </Container>
          </div>
        ))}
      </Masonry>
      <Modal
        show={!!selectedImage}
        onHide={() => setSelectedImage(null)}
        centered
      >
        <Modal.Body className="p-0">
          <Image
            src={selectedImage === null ? "" : selectedImage}
            alt="Immagine Ingrandita"
            className="w-100"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default MasonryGallery;
