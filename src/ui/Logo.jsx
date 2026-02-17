import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLogo = styled(Link)`
  font-size: 26px;
  font-weight: 800;
  letter-spacing: 1px;
  text-decoration: none;
  margin-bottom: 20px;
  margin-top: 20px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

function Logo() {
  return <StyledLogo to="/">VibeHub</StyledLogo>;
}

export default Logo;
