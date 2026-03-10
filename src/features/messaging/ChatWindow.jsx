import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";

const Window = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const Empty = styled.p`
  color: var(--color-grey-400);
  font-size: 13px;
  text-align: center;
  margin: 40px auto;
`;

function ChatWindow({ userId, onBack }) {
  if (!userId) return <Empty>Select a conversation to start chatting 😄</Empty>;

  return (
    <Window>
      <ChatHeader userId={userId} onBack={onBack} />
      <MessagesList userId={userId} />
      <MessageInput receiverId={userId} />
    </Window>
  );
}

export default ChatWindow;
