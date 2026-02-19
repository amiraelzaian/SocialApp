import { PacmanLoader } from "react-spinners";
import styled from "styled-components";

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

function Spinner() {
  return (
    <StyledOverlay>
      <PacmanLoader color="var(--color-brand-500)" size={25} />
    </StyledOverlay>
  );
}

export default Spinner;
