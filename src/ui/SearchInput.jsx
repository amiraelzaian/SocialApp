import Input from "./Input.jsx";
import { useSearch } from "../context/SearchContext.jsx";
import { useGetPage } from "../hooks/useGetPage.js";
import { useEffect } from "react";

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
    <Input
      type="text"
      placeholder={placeholders[nameOfPage] || "Search..."}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}

export default SearchInput;
