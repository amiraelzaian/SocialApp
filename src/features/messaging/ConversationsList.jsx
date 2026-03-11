import styled from "styled-components";
import { useConversations } from "./useConversations";
import ConversationItem from "./ConversationItem";
import SearchInput from "../../ui/SearchInput";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearch } from "../../context/SearchContext";
import { HiChevronDown } from "react-icons/hi";

const List = styled.ul`
  position: relative;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const P = styled.p`
  color: var(--color-grey-400);
  font-size: 13px;
`;

function ConversationsList({ selectedUser }) {
  const { conversations } = useConversations();
  const { searchQuery } = useSearch();
  const debouncedQuery = useDebounce(searchQuery);

  const filteredChats = debouncedQuery
    ? conversations?.filter(
        (chat) =>
          chat.otherUser.full_name
            .toLowerCase()
            .includes(debouncedQuery.toLowerCase()) ||
          chat.otherUser.username
            .toLowerCase()
            .includes(debouncedQuery.toLowerCase()),
      )
    : conversations;

  return (
    <>
      <SearchInput />
      <List>
        {filteredChats?.map((chat) => (
          <ConversationItem
            chat={chat}
            key={chat.otherUser.id}
            isActive={chat.otherUser.id === selectedUser}
          />
        ))}

        {conversations?.length === 0 && <P>There are no chats yet 💔</P>}
      </List>
    </>
  );
}

export default ConversationsList;
