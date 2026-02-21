import { HiOutlineX } from "react-icons/hi";
import styled, { keyframes } from "styled-components";
import { createPortal } from "react-dom";
import { useScreen } from "../context/ScreenSizeContext";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(2rem) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const slideUpMobile = keyframes`
  from { opacity: 0; transform: translateY(100%); }
  to { opacity: 1; transform: translateY(0); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: ${({ $isMobile }) => ($isMobile ? "flex-end" : "center")};
  z-index: 1000;
  padding: ${({ $isMobile }) => ($isMobile ? "0" : "2rem")};
  animation: ${fadeIn} 0.2s ease;
`;

const ModalWrapper = styled.div`
  position: relative;
  background: var(--color-grey-0);
  border-radius: ${({ $isMobile }) =>
    $isMobile ? "2rem 2rem 0 0" : "var(--border-radius-lg)"};
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "60rem")};
  max-width: 100%;
  max-height: ${({ $isMobile }) => ($isMobile ? "92vh" : "90vh")};
  overflow-y: auto;
  box-shadow: ${({ $isMobile }) =>
    $isMobile
      ? "0 -8px 32px rgba(0, 0, 0, 0.15)"
      : "0 12px 40px rgba(0, 0, 0, 0.2)"};
  animation: ${({ $isMobile }) => ($isMobile ? slideUpMobile : slideUp)} 0.3s
    cubic-bezier(0.34, 1.2, 0.64, 1);

  ${({ $isMobile }) =>
    $isMobile &&
    `
    &::before {
      content: "";
      display: block;
      width: 4rem;
      height: 0.4rem;
      background: var(--color-grey-300);
      border-radius: 99px;
      margin: 1.2rem auto 0;
    }
  `}

  &::-webkit-scrollbar {
    width: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 99px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
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
    transform: rotate(90deg);
  }

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-brand-600);
  }

  svg {
    font-size: 2rem;
  }
`;

function Modal({ children, onClose }) {
  const { isMobile } = useScreen();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick} $isMobile={isMobile}>
      <ModalWrapper $isMobile={isMobile}>
        <CloseButton onClick={onClose}>
          <HiOutlineX />
        </CloseButton>
        {children}
      </ModalWrapper>
    </Overlay>,
    document.body,
  );
}

export default Modal;
