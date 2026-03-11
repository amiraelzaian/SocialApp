import styled from "styled-components";

const ScrollBtn = styled.button`
  position: absolute;
  bottom: 80px;
  left: ${({ $chat }) => $chat && "50%"};
  right: ${({ $chat }) => !$chat && "10px"};

  transform: ${({ $chat }) => ($chat ? "translateX(-50%)" : "")};
  transition: 0.3s;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  background: var(--color-brand-600);
  color: white;
  font-size: 18px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;
export default ScrollBtn;
