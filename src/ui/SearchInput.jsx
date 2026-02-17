import { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid var(--color-grey-200);
  font-size: 14px;
  transition: all 0.2s ease;
  background-color: var(--color-grey-100);
  &::placeholder {
    color: var(--color-grey-400);
  }

  &:focus {
    outline: none;
    border-color: var(--color-brand-500);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

function SearchInput() {
  const [searchInput, setSearchInput] = useState("");

  function handleChange(e) {
    setSearchInput(e.target.value);
  }

  return (
    <Input
      type="text"
      placeholder="Search users..."
      value={searchInput}
      onChange={handleChange}
    />
  );
}

export default SearchInput;
