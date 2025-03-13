"use client";
import React from "react";
import { Modal, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PiQuestionLight, PiInfo } from "react-icons/pi";
import { hideAlert } from "@/redux/reducer";
import { RootState } from "@/redux/store";

const AlertModal = () => {
  const dispatch = useDispatch();
  const { show, message, alertType } = useSelector(
    (state: RootState) => state.imgReducer.alert
  );

  const handleClose = () => {
    dispatch(hideAlert(false));
  };

  return (
    <Modal className="dark-modal" show={show} onHide={handleClose} centered>
      <Modal.Body
        style={{ borderRadius: "7px" }}
        className="d-flex flex-column p-0 bg-dark text-white"
      >
        <Modal.Title className="text-center">
          {alertType === "error" ? (
            <button className="btn btn-danger m-0 p-2 border-0">
              <PiQuestionLight size={40} />
            </button>
          ) : (
            <button className="btn btn-warning m-0 p-2 border-0">
              <PiInfo color="white" size={40} />
            </button>
          )}
        </Modal.Title>
        <Modal.Title className="text-center mt-3">
          {alertType === "error" ? "Oooops!" : "OK!"}
        </Modal.Title>
        <Modal.Title className="text-center mb-3">
          {alertType === "error"
            ? "Qualcosa è andato storto..."
            : "Operazione andata a buon fine!"}
        </Modal.Title>
        <Modal.Title className="text-center mb-3 fs-6">{message}</Modal.Title>

        <Container className="d-flex justify-content-end">
          <Button
            variant="success"
            className="d-flex justify-content-center w-25 mb-3"
            onClick={handleClose}
          >
            Close
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default AlertModal;
