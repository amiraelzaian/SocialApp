import styled from "styled-components";
import { useConversations } from "./useConversations";
import ConversationItem from "./ConversationItem";
import SearchInput from "../../ui/SearchInput";

const List = styled.ul`
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

  return (
    <>
      <SearchInput />
      <List>
        {conversations?.map((chat) => (
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
