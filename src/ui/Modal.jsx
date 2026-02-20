import { HiOutlineX } from "react-icons/hi";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  position: relative; /* ✅ Added for close button positioning */
  background: var(--color-grey-0); /* ✅ Use CSS variable */
  border-radius: var(--border-radius-lg);
  max-width: 90%;
  width: 60rem;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute; /* ✅ Position inside modal */
  top: 1.6rem;
  right: 1.6rem;
  background-color: var(--color-grey-100);
  color: var(--color-grey-600);
  border: none;
  border-radius: 50%;
  width: 3.6rem;
  height: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    background-color: var(--color-grey-200);
    color: var(--color-grey-900);
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }

  svg {
    font-size: 2.4rem;
  }
`;

function Modal({ children, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalWrapper>
        <CloseButton onClick={onClose}>
          <HiOutlineX />
        </CloseButton>
        {children}
      </ModalWrapper>
    </Overlay>
  );
}

export default Modal;
