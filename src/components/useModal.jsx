import React, { useCallback, useState } from "react";
import Modal from "../components/Modal";

const useModal = ({ useBlur = true, title, width, height } = {}) => {
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
          <Modal
            onClose={useBlur ? close : null}
            title={title}
            width={width}
            height={height}
          >
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
