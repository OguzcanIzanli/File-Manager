import { createContext, useState, useContext } from "react";
import { v4 } from "uuid";
import Modal from "./Modal";

const ModalContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([{ id: "sample-modal" }]);

  const appear = (modal) => {
    const id = v4();
    setModals([...modals, { ...modal, id: id }]);
  };

  const disappear = (modalId) => {
    setModals(modals.filter((m) => m.id !== modalId));
  };

  return (
    <ModalContext.Provider value={{ appear, disappear }}>
      {children}

      <div id="modalsPortal">
        {modals.map((modal) => {
          <Modal
            style={modal.style}
            className={modal.className}
            id={modal.id}
            title={modal.title}
            // eslint-disable-next-line react/no-children-prop
            children={modal.children}
          />;
        })}
      </div>
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
  const value = useContext(ModalContext);
  if (!value) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return value;
};
