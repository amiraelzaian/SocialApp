import { useState } from "react";
import styled from "styled-components";
import Input from "../../ui/Input";
import { HiPaperAirplane } from "react-icons/hi";
import { useSendMessage } from "./useSendMessage";
import { useScreen } from "../../context/ScreenSizeContext";

const InputBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 1px;
  padding-right: 30px;
  padding-left: 30px;
  padding-bottom: ${({ $isMobile }) => ($isMobile ? "60px" : "10px")};
  width: 100%;
  flex-shrink: 0;
`;

const SendButton = styled.button`
  background: var(--color-brand-600);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    background: var(--color-brand-700);
  }
`;

function MessageInput({ receiverId }) {
  const [content, setContent] = useState("");
  const { sendMessage, isSending } = useSendMessage();
  const { isMobile } = useScreen();

  function handleSend() {
    if (!content.trim()) return;
    sendMessage({ receiverId, content });
    setContent("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <InputBar $isMobile={isMobile}>
      <Input
        placeholder="Type a message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isSending}
      />
      <SendButton onClick={handleSend} disabled={isSending}>
        <HiPaperAirplane size={18} />
      </SendButton>
    </InputBar>
  );
}

export default MessageInput;
