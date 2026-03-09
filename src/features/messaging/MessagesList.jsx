import styled from "styled-components";
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import Spinner from "../../ui/Spinner";
import { useMessages } from "./useMessages";
import { useRealtimeMessages } from "./useRealtimeMessages";
import { useUser } from "../authentication/useUser";

const List = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;

  /* hide scrollbar */
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
  const { user } = useUser();
  const bottomRef = useRef(null);

  useRealtimeMessages(userId);

  // Auto scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isPending) return <Spinner />;

  if (!messages?.length) return <Empty>No messages yet. Say hello! 👋</Empty>;

  return (
    <List>
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          currentUserId={user?.id}
        />
      ))}
      <div ref={bottomRef} />
    </List>
  );
}

export default MessagesList;
