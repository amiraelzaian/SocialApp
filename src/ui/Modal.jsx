import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  max-width: 90%;
  width: 60rem;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

function Modal({ children, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalWrapper>{children}</ModalWrapper>
    </Overlay>
  );
}

export default Modal;
