import { useModal } from "./ModalContext";

const Modal = ({ id, title, onClose, className, style, children }) => {
  const { disappear } = useModal();

  return <div className="modal">{children}</div>;
};

export default Modal;
