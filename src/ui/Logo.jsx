import { Link } from "react-router-dom";
import styled from "styled-components";
import { useScreen } from "../context/ScreenSizeContext";

const StyledLogo = styled(Link)`
  display: inline-block; /* ensures transform works on inline element */
  font-size: 26px;
  font-weight: 800;
  letter-spacing: 1px;
  text-decoration: none;
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(
    --color-brand-600
  ); /* fallback for forced-color / high-contrast modes */
  transition: transform 0.2s ease;

  margin-top: ${({ $isMobile }) => (!$isMobile ? "16px" : "0")};
  margin-bottom: ${({ $isMobile }) => (!$isMobile ? "16px" : "0")};
  &:hover {
    transform: scale(1.05);
  }

  /* Remove vertical margins — let parent control spacing */
`;

function Logo() {
  const { isMobile } = useScreen();
  return (
    <StyledLogo $isMobile={isMobile} to="/">
      VibeHub
    </StyledLogo>
  );
}

export default Logo;
