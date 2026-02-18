import styled from "styled-components";

const Input = styled.input`
  outline: none;
  border: 1.5px solid var(--color-grey-200);
  border-radius: 10px;
  padding: 12px 16px;
  width: 100%;
  background-color: var(--color-grey-50);
  color: var(--color-grey-800);
  font-size: 1.5rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &::placeholder {
    color: var(--color-grey-400);
  }

  &:focus {
    border-color: var(--color-brand-400);
    box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.12);
  }

  &:hover:not(:focus) {
    border-color: var(--color-grey-300);
  }
`;

export default Input;
