import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import ScrollBtn from "../../ui/ScrollBtn";

import { HiChevronDown } from "react-icons/hi";
import { useRef, useState } from "react";

const Window = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Empty = styled.p`
  color: var(--color-grey-400);
  font-size: 13px;
  text-align: center;
  margin: 40px auto;
`;

function ChatWindow({ userId }) {
  const bottomRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  if (!userId) return <Empty>Select a conversation to start chatting 😄</Empty>;

  return (
    <Window>
      <ChatHeader userId={userId} />
      <MessagesList
        userId={userId}
        bottomRef={bottomRef}
        onScroll={(show) => setShowScrollBtn(show)}
      />
      {showScrollBtn && (
        <ScrollBtn
          $chat={true}
          onClick={() =>
            bottomRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <HiChevronDown />
        </ScrollBtn>
      )}
      <MessageInput receiverId={userId} />
    </Window>
  );
}

export default ChatWindow;
