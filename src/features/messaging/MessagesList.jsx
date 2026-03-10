import styled from "styled-components";
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import Spinner from "../../ui/Spinner";
import { useMessages } from "./useMessages";
import { useRealtimeMessages } from "./useRealtimeMessages";
import { useUser } from "../authentication/useUser";
import { useMarkConversationAsRead } from "./useMarkConversationAsRead";

const List = styled.div`
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

function MessagesList({ userId }) {
  const { messages, isPending } = useMessages(userId);
  const { markConversationAsRead } = useMarkConversationAsRead();
  const { user } = useUser();
  const bottomRef = useRef(null);

  useRealtimeMessages(userId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (userId) markConversationAsRead({ otherUserId: userId });
  }, [userId, markConversationAsRead]);

  if (isPending) return <Spinner />;
  if (!messages?.length) return <Empty>No messages yet. Say hello! 👋</Empty>;

  return (
    <List>
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
