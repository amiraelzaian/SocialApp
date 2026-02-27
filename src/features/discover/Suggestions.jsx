import styled from "styled-components";
import { useScreen } from "../../context/ScreenSizeContext";
import DiscoverUserCard from "./DiscoverUserCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "1fr" : $isTablet ? " 1fr 1fr" : "1fr 1fr 1fr"};
  padding: 20px;
  margin: auto;
`;

function Suggestions() {
  const { isMobile, isTablet } = useScreen();
  console.log(isMobile, isTablet);

  return (
    <Grid $isMobile={isMobile} $isTablet={isTablet}>
      <DiscoverUserCard />
    </Grid>
  );
}

export default Suggestions;
