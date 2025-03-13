"use client";
import { Container, Form, Image, Nav, Navbar } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  fetchImages,
  handleSearch,
  handleUpload,
} from "../utils/requestCloudinary";
import { IoImagesSharp } from "react-icons/io5";
import { MdOutlineImageSearch } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { updateImages } from "@/redux/reducer";
interface HeaderProps {
  isMobileOrTablet: boolean;
}

const HeaderCloudinaryManager: React.FC<HeaderProps> = ({
  isMobileOrTablet,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("Nominami...ah");
  const [query, setQuery] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);

  return (
    <Navbar expand="lg" bg="black" data-bs-theme="dark" className="mb-3">
      <Container fluid>
        <Navbar.Brand href="/">Cloudinary Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-center">
          <Nav className="me-auto">
            <Nav.Link
              className="d-flex justify-content-center align-items-center"
              onClick={() => {
                fetchImages(dispatch);
              }}
            >
              <IoImagesSharp color="aliceblue" size={20} />
            </Nav.Link>

            <Nav.Link className="d-flex justify-content-center align-items-center position-relative">
              <MdOutlineImageSearch
                color="aliceblue"
                onClick={() => {
                  setShowSearch(!showSearch);
                }}
                size={20}
              />
              {showSearch && (
                <Form.Control
                  type="text"
                  style={{
                    fontSize: "0.7em",
                    width: "150px",
                    left: !isMobileOrTablet ? "30px" : "285px",
                    zIndex: 99999999999999999999999,
                  }}
                  placeholder="Cerca Img"
                  onChange={(e) =>
                    handleSearch(e.target.value, setQuery, dispatch)
                  }
                  value={query}
                  className="position-absolute"
                />
              )}
            </Nav.Link>
            <Nav.Link className="d-flex justify-content-center align-items-center position-relative">
              <RiImageAddFill
                color="aliceblue"
                style={{ background: "" }}
                size={20}
                onClick={() => {
                  setShowAdd(!showAdd);
                }}
              />
              {showAdd && (
                <Dropzone
                  onDrop={(acceptedFiles) =>
                    handleUpload(acceptedFiles, name, dispatch, setPreview)
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <section
                      className="m-0 p-0"
                      style={{
                        top: "10px",
                        width: "150px",
                        left: !isMobileOrTablet ? "30px" : "285px",
                      }}
                    >
                      <Container
                        fluid
                        className="m-0 p-1 mb-3"
                        {...getRootProps()}
                        style={{
                          border: "2px dashed green",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        <input {...getInputProps()} />
                        {!preview && (
                          <Container>
                            <p
                              style={{ fontSize: "0.7em" }}
                              className="m-0 p-0 text-center fw-bolder"
                            >
                              Dai un nome alla Foto
                              <br /> poi <br />
                              Trascina un immagine o clicca per caricarla
                            </p>
                          </Container>
                        )}
                        {preview && (
                          <Container className="text-center">
                            <Image
                              src={preview}
                              alt="Preview"
                              style={{ maxWidth: "100%" }}
                            />
                          </Container>
                        )}
                      </Container>
                      <Form.Control
                        type="text"
                        style={{ fontSize: "0.7em", width: "initial" }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onClick={() => setName("")}
                      />
                    </section>
                  )}
                </Dropzone>
              )}
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              className="d-flex justify-content-center align-items-center"
              onClick={() => {
                dispatch(updateImages([]));
              }}
            >
              <IoIosLogOut color="aliceblue" size={20} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default HeaderCloudinaryManager;
