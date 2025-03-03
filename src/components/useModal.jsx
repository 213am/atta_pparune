import React, { useCallback, useState } from "react";
import Modal from "../components/Modal";

const useModal = ({ useBlur = true, title } = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventData, setEventData] = useState({});

  const open = useCallback(e => {
    console.log(e);
    setEventData({ ...e });
    setIsOpen(() => true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(() => false);
  }, []);
  return {
    Modal: isOpen
      ? ({ children }) => (
          <Modal onClose={useBlur ? close : null} title={title}>
            {children}
          </Modal>
        )
      : () => null,
    open,
    close,
    isOpen,
    eventData,
  };
};
export default useModal;
