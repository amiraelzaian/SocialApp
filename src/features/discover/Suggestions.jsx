import styled from "styled-components";
import { useScreen } from "../../context/ScreenSizeContext";
import { useSuggestedUsers } from "./useSuggestedUsers";
import { useSearchUsers } from "./useSearchUsers";
import { useSearch } from "../../context/SearchContext";
import { useDebounce } from "../../hooks/useDebounce";
import DiscoverUserCard from "./DiscoverUserCard";
import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "1fr" : $isTablet ? "1fr 1fr" : "1fr 1fr 1fr"};
  padding: 20px;
  margin: auto;
`;

function Suggestions() {
  const { user } = useUser();
  const { isMobile, isTablet } = useScreen();
  const { searchQuery } = useSearch();
  const debouncedQuery = useDebounce(searchQuery);

  const { suggestedUsers = [], isPending: isSuggestionsPending } =
    useSuggestedUsers();
  const { searchResults = [], isPending: isSearchPending } =
    useSearchUsers(debouncedQuery);

  const isSearching = !!debouncedQuery;
  const users = isSearching ? searchResults : suggestedUsers;
  const isPending = isSearching ? isSearchPending : isSuggestionsPending;

  const filteredUsers = users.filter((u) => u.id !== user.id) || users;

  if (isPending) return <Spinner />;
  if (filteredUsers.length === 0)
    return <p style={{ padding: "20px" }}>No users found.</p>;

  return (
    <Grid $isMobile={isMobile} $isTablet={isTablet}>
      {filteredUsers.map((user) => (
        <DiscoverUserCard key={user.id} data={user} />
      ))}
    </Grid>
  );
}

export default Suggestions;
