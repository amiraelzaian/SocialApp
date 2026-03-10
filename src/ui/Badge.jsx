import styled from "styled-components";

const StyledBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -8px;
  background: var(--color-red-700);
  color: white;
  font-size: 1rem;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
`;

const StyledDot = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--color-red-700);
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

function Badge({ badge }) {
  if (badge === "dot") return <StyledDot />;
  return <StyledBadge>{badge > 99 ? "99+" : badge}</StyledBadge>;
}

export default Badge;
