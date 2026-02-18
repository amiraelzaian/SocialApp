import styled from "styled-components";

const StyledAvatar = styled.div`
  background: var(--gradient-primary);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  flex-shrink: 0;
`;

function FakeAvatar({ children }) {
  return <StyledAvatar>{children || "AZ"}</StyledAvatar>;
}

export default FakeAvatar;
