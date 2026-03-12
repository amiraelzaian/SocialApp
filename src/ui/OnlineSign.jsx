import styled from "styled-components";

const OnlineSign = styled.span`
  width: ${({ $inProfile }) => ($inProfile ? "23px" : "15px")};
  height: ${({ $inProfile }) => ($inProfile ? "23px" : "15px")};

  border-radius: 50%;
  background-color: var(--color-green-100);
  position: absolute;
  z-index: 1000;
  box-shadow: var(--shadow-lg);

  right: -3px;
  bottom: 6px;
`;
export default OnlineSign;
