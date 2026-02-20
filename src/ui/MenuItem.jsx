import styled from "styled-components";

const StyledItem = styled.li`
  color: ${({ $danger }) =>
    $danger ? "var(--color-red-700)" : "var(--color-grey-700)"};
  font-size: 1.4rem;
  cursor: pointer;
  padding: 0.8rem 1.2rem;
  border-radius: var(--border-radius-sm);
  transition:
    background 0.15s,
    color 0.15s;

  &:hover {
    background-color: ${({ $danger }) =>
      $danger ? "var(--color-red-100)" : "var(--color-grey-100)"};
    color: ${({ $danger }) =>
      $danger ? "var(--color-red-800)" : "var(--color-grey-900)"};
  }
`;

function MenuItem({ onClick, children, danger = false }) {
  return (
    <StyledItem onClick={onClick} $danger={danger}>
      {children}
    </StyledItem>
  );
}

export default MenuItem;
