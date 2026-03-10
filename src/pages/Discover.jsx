import styled from "styled-components";
import Suggestions from "../features/discover/Suggestions";

const StyledContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: fit-content;
  padding-bottom: 45px;
`;

function Discover() {
  return (
    <StyledContainer>
      <Suggestions />
    </StyledContainer>
  );
}

export default Discover;
