import { useModal } from "./ModalContext";

// eslint-disable-next-line react/prop-types
const Modal = ({ id, title, onClose, className, style, children }) => {
  const { disappear } = useModal();

  const Children = children;

  return (
    <div className={`modal ${className || ""}`} style={style}>
      <div className="modalTitle">{title}</div>

      <div className="modalChildren">
        {/* eslint-disable-next-line react/no-unknown-property */}
        <Children modalId={id} />
      </div>
    </div>
  );
};

export default Modal;
