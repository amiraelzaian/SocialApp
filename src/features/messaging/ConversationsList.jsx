import styled from "styled-components";
import { useConversations } from "./useConversations";
import ConversationItem from "./ConversationItem";
import Spinner from "../../ui/Spinner";
import SearchInput from "../../ui/SearchInput";

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
  padding: 5px;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  /* ...existing styles... */
  overflow-y: scroll;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }
`;

const P = styled.p`
  color: var(--color-grey-400);
  font-size: 13px;
`;
function ConversationsList({ onSelect }) {
  const { conversations, isPending } = useConversations();

  // if (isPending) return <Spinner />;

  return (
    <>
      <SearchInput />
      <List>
        {conversations.map((chat) => (
          <ConversationItem
            chat={chat}
            key={chat.otherUser.id}
            onSelect={onSelect}
          />
        ))}
        {conversations.lenght === 0 && <P>There're not chats yet 💔</P>}
      </List>
    </>
  );
}

export default ConversationsList;
