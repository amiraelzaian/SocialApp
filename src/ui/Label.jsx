import styled from "styled-components";

const Label = styled.label`
  color: ${({ $variant }) =>
    $variant === "error"
      ? "#dc2626"
      : $variant === "success"
        ? "var(--color-brand-600)"
        : "var(--color-grey-700)"};

  font-size: ${({ $size }) =>
    $size === "sm" ? "0.75rem" : $size === "lg" ? "1.5rem" : "0.9rem"};

  font-weight: ${({ $variant }) => ($variant === "error" ? "400" : "500")};
  letter-spacing: 0.01em;
  line-height: 1.5;
  transition: color 0.2s ease;
  cursor: ${({ $clickable, $variant }) =>
    $clickable || $variant === "success" ? "pointer" : "default"};

  &:hover {
    color: ${({ $clickable, $variant }) =>
      $clickable || $variant === "success"
        ? "var(--color-pink-500)"
        : "inherit"};
    text-decoration: ${({ $variant }) =>
      $variant === "success" ? "underline" : "none"};
  }
`;

export default Label;
