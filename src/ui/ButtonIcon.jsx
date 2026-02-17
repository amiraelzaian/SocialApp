import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useScreenSize } from "../hooks/useScreenSize";

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 12px 16px;
  border-radius: 8px;

  text-decoration: none;
  color: var(--color-grey-700);
  font-weight: 500;
  width: 100%;
  transition: all 0.2s ease;

  & svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: var(--color-grey-100);
  }

  &.active {
    background-color: var(--color-brand-100);
    color: var(--color-brand-700);
  }
`;

function ButtonIcon({ to, icon, children }) {
  const { isMobile } = useScreenSize();

  return (
    <StyledNavLink to={to}>
      {icon}
      <span>{!isMobile && children}</span>
    </StyledNavLink>
  );
}

export default ButtonIcon;
