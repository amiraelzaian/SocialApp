import styled, { css } from "styled-components";

const variations = {
  primary: css`
    background: var(--gradient-primary);
    color: white;
    box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
  `,
  secondary: css`
    background-color: var(--color-grey-100);
    color: var(--color-grey-800);
    border: 1px solid var(--color-grey-200);
  `,
  danger: css`
    background-color: var(--color-red-700);
    color: white;
    box-shadow: 0 4px 15px rgba(185, 28, 28, 0.3);
  `,
  outlined: css`
    background-color: transparent;
    border: 1.5px solid var(--color-brand-400);
    color: var(--color-brand-600);
  `,
};

const sizes = {
  small: css`
    font-size: 1rem;
    padding: 6px 12px;
    border-radius: 6px;
  `,
  medium: css`
    font-size: 1.2rem;
    font-weight: 500;
    padding: 9px 18px;
    border-radius: 8px;
  `,
  large: css`
    font-size: 1.5rem;
    padding: 13px 24px;
    border-radius: 10px;
    width: 100%;
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: all 0.25s ease;
  white-space: nowrap;

  ${(props) => variations[props.$variation]}
  ${(props) => sizes[props.$size]}

  &:hover:not(:disabled) {
    opacity: 1;
    transform: translateY(-2px);
    box-shadow: ${({ $variation }) =>
      $variation === "primary"
        ? "0 8px 25px rgba(168, 85, 247, 0.4)"
        : $variation === "danger"
          ? "0 8px 25px rgba(185, 28, 28, 0.35)"
          : "0 4px 12px rgba(0,0,0,0.1)"};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`;

function Button({
  onClick,
  children,
  variation = "primary",
  size = "medium",
  ...props
}) {
  return (
    <StyledButton
      $variation={variation}
      $size={size}
      {...props}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
