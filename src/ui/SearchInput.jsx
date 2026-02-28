import styled from "styled-components";
import { useSearch } from "../context/SearchContext.jsx";
import { useGetPage } from "../hooks/useGetPage.js";
import { useEffect } from "react";

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

const placeholders = {
  Discover: "Search users...",
  Messages: "Search messages...",
};

function SearchInput() {
  const { searchQuery, setSearchQuery } = useSearch();
  const { nameOfPage } = useGetPage();

  // debouncedValue not needed here — remove it
  useEffect(() => {
    setSearchQuery("");
  }, [nameOfPage, setSearchQuery]);

  return (
    <Input
      type="text"
      placeholder={placeholders[nameOfPage] || "Search..."}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}

export default SearchInput;
