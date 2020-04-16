import React, { useState } from "react";
import "./App.css";
import Alert from "./components/alert";
import Modal from "./components/modal";
import Toaster from "./components/toaster";
import Tooltip from "./components/tooltip";

function App() {
  let [open, setIsOpen] = useState(false);
  let [openModal, setIsOpenModal] = useState(false);
  let [openToaster, setIsOpenToaster] = useState(false);
  function handleClick() {
    setIsOpen(!open);
  }
  function handleClickModal() {
    setIsOpenModal(!openModal);
  }
  function handleClickToaster() {
    setIsOpenToaster(!openToaster);
  }
  const functionsName = [handleClick, handleClickToaster];
  const buttonsName = ["Voltar", "Ok"];
  return (
    <div>
      <button onClick={handleClick}>Abrir Alert</button>
      <Alert
        title="Lorem Ipsum Dolor"
        type="success"
        isOpen={open}
        onClick={functionsName}
        buttonName={buttonsName}
      />
      <button onClick={handleClickModal}>Abrir Modal</button>
      <Modal
        title="Lorem Ipsum Dolor"
        onClose={handleClickModal}
        isOpen={openModal}
        size="lg"
      >
        asdasdsa
      </Modal>
      <Tooltip title="Lorem Ipsum">
        <button onClick={handleClickToaster} onChange={handleClickToaster}>
          Abrir Toaster
        </button>
      </Tooltip>

      <Toaster
        title="Lorem Ipsum Dolor"
        onClick={handleClickToaster}
        isOpen={openToaster}
      />
    </div>
  );
}

export default App;
