import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: ${({ $direction }) => $direction || "column"};
  justify-content: ${({ $justify }) => $justify || "flex-start"};
  align-items: ${({ $align }) => $align || "flex-start"};
  gap: ${({ $gap }) => $gap || "6px"};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "100%")};
  margin-bottom: ${({ $mb }) => $mb || "10px"};
`;

export default Row;
