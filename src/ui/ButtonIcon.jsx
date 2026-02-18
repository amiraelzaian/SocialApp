import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useScreenSize } from "../hooks/useScreenSize";

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};

  gap: ${({ $isMobile }) => ($isMobile ? "5px" : "10px")};

  padding: 12px 16px;
  border-radius: 8px;

  text-decoration: none;
  color: var(--color-grey-700);
  font-size: ${({ $isMobile }) => ($isMobile ? "13px" : "16px")};
  font-weight: 500;
  width: 90%;
  transition: all 0.2s ease;
  margin: 3px auto;
  & svg {
    width: 22px;
    height: 22px;
  }

  &:hover {
    background-color: var(--color-grey-100);
  }

  &.active {
    /* background-color: var(--color-brand-100); */
    color: var(--color-brand-700);
  }
`;

function ButtonIcon({ to, icon, children }) {
  const { isMobile } = useScreenSize();

  return (
    <StyledNavLink to={to} $isMobile={isMobile}>
      {icon}
      <span>{children}</span>
    </StyledNavLink>
  );
}

export default ButtonIcon;
