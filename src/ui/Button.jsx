import styled, { css } from "styled-components";

const variations = {
  primary: css`
    background-color: var(--color-brand-500);
    color: white;
  `,
  secondary: css`
    background-color: var(--color-grey-100);
    color: var(--color-grey-800);
    border: 1px solid var(--color-grey-200);
  `,
  danger: css`
    background-color: var(--color-red-700);
    color: white;
  `,
  outlined: css`
    background-color: transparent;
    border: none;
  `,
};

const sizes = {
  small: css`
    font-size: 14px;
    padding: 6px 12px;
    border-radius: 4px;
  `,
  medium: css`
    font-size: 16px;
    font-weight: 400;
    padding: 8px 8px;
    border-radius: 6px;
  `,
  large: css`
    font-size: 18px;
    padding: 12px 22px;
    border-radius: 8px;
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;

  ${(props) => variations[props.variation]}
  ${(props) => sizes[props.size]}

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

function Button({
  children,
  variation = "primary",
  size = "medium",
  ...props
}) {
  return (
    <StyledButton variation={variation} size={size} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
