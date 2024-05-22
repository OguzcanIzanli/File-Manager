import {
  createContext,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";
import { v4 } from "uuid";
import Modal from "./Modal";
import "./Modal.styles.css";

const ModalContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([]);

  const backdropRef = useRef(null);

  const appear = (modal) => {
    const id = v4();
    setModals([...modals, { ...modal, id: id }]);
  };

  const disappear = (modalId) => {
    setModals(modals.filter((m) => m.id !== modalId));
  };

  const handleBackdropClick = useCallback((e) => {
    if (e.target !== backdropRef.current) return;
    setModals((prev) => {
      const newModals = [...prev];
      newModals.pop();
      return newModals;
    });
  }, []);

  return (
    <ModalContext.Provider value={{ appear, disappear }}>
      {children}
      {/* !! => to change boolean or Boolean() */}
      {Boolean(modals.length) && (
        <div ref={backdropRef} id="modalsPortal" onClick={handleBackdropClick}>
          {modals.map((modal) => {
            return (
              <Modal
                onClose={() => disappear(modal.id)}
                key={modal.id}
                style={modal.style}
                className={modal.className}
                id={modal.id}
                title={modal.title}
                // eslint-disable-next-line react/no-children-prop
                children={modal.children}
              />
            );
          })}
        </div>
      )}
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
