import styled from "styled-components";
import { useEffect } from "react";
import MessageBubble from "./MessageBubble";
import Spinner from "../../ui/Spinner";
import MiniSpinner from "../../ui/MiniSpinner";
import { useMessages } from "./useMessages";
import { useUser } from "../authentication/useUser";
import { useMarkConversationAsRead } from "./useMarkConversationAsRead";
import { HiChevronDown } from "react-icons/hi";

const List = styled.div`
  position: relative;
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Empty = styled.p`
  text-align: center;
  color: var(--color-grey-400);
  font-size: 13px;
  margin: auto;
`;
const Loading = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
`;
function MessagesList({ userId, bottomRef, onScroll }) {
  const { messages, isPending } = useMessages(userId);
  const { markConversationAsRead } = useMarkConversationAsRead();
  const { user } = useUser();

  function handleScroll(e) {
    const el = e.target;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    onScroll?.(distanceFromBottom > 100);
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, bottomRef]);

  useEffect(() => {
    if (userId) markConversationAsRead({ otherUserId: userId });
  }, [userId, markConversationAsRead]);

  if (isPending)
    return (
      <Loading>
        <MiniSpinner />
      </Loading>
    );
  if (!messages?.length) return <Empty>No messages yet. Say hello! 👋</Empty>;

  return (
    <List onScroll={handleScroll}>
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          currentUserId={user?.id}
          userId={userId}
        />
      ))}

      <div ref={bottomRef} />
    </List>
  );
}

export default MessagesList;
