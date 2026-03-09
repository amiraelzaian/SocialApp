import styled from "styled-components";
import Avatar from "../../ui/Avatar";
import { timeAgo } from "../../utils/helpers";
import { useUnreadMessagesCount } from "./useUnreadCount";
import Badge from "../../ui/badge";

const Item = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--color-grey-200);
  border-radius: 10px;
  padding: 3px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-200);
  }
  &:active,
  &:focus {
    background-color: var(--color-brand-400);
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
`;

const TopDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Username = styled.p`
  font-weight: bold;
  color: var(--color-grey-600);
`;

const TimeAgo = styled.p`
  font-size: 13px;
  color: var(--color-grey-400);
`;

const LastMessage = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-grey-500);
`;
const Container = styled.div`
  position: relative;
`;

function ConversationItem({ chat, onSelect }) {
  const { unreadMessagesCount: badge } = useUnreadMessagesCount();

  return (
    <Item onClick={() => onSelect(chat.otherUser.id)}>
      <Container>
        {badge > 0 && <Badge badge={badge} />}
        <Avatar
          src={chat.otherUser.avatar_url}
          name={chat.otherUser.full_name}
        />
      </Container>
      <Details>
        <TopDetails>
          <Username>{chat.otherUser.username}</Username>
          <TimeAgo>{timeAgo(chat.lastMessageTime)}</TimeAgo>
        </TopDetails>
        <LastMessage>{chat.lastMessage}</LastMessage>
      </Details>
    </Item>
  );
}

export default ConversationItem;
