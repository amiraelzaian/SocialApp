import Input from "./Input.jsx";
import { useSearch } from "../context/SearchContext.jsx";
import { useGetPage } from "../hooks/useGetPage.js";
import { useEffect } from "react";
import { HiXCircle } from "react-icons/hi2";

import styled from "styled-components";

const StyledDiv = styled.div`
  position: relative;
  width: 100%;
`;

const XButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  outline: none;
  background-color: transparent;

  &:hover,
  &:active,
  &:focus {
    outline: none;
  }
`;

const placeholders = {
  Discover: "Search users...",
  Messages: "Search chats...",
};

function SearchInput() {
  const { searchQuery, setSearchQuery } = useSearch();
  const { nameOfPage } = useGetPage();

  // debouncedValue not needed here — remove it
  useEffect(() => {
    setSearchQuery("");
  }, [nameOfPage, setSearchQuery]);

  return (
    <StyledDiv>
      <Input
        type="text"
        placeholder={placeholders[nameOfPage] || "Search..."}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <XButton onClick={() => setSearchQuery("")}>
          <HiXCircle size={22} />
        </XButton>
      )}
    </StyledDiv>
  );
}

export default SearchInput;
