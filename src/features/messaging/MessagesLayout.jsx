import { useScreen } from "../../context/ScreenSizeContext";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ConversationsList from "./ConversationsList";
import ChatWindow from "./ChatWindow";

const Layout = styled.div`
  display: grid;
  grid-template-columns: ${({ $isMobile }) =>
    $isMobile ? "1fr" : "320px 1fr"};
  height: 100%;
  overflow: hidden;
`;

const ConversationSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  height: 100%;
  overflow: hidden;
  background-color: var(--color-grey-50);
  border-right: 1px solid var(--color-grey-200);

  @media (max-width: 768px) {
    display: ${({ $show }) => ($show ? "flex" : "none")};
  }
`;

const ChatSide = styled.div`
  height: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    display: ${({ $show }) => ($show ? "block" : "none")};
  }
`;

function MessagesLayout() {
  const { isMobile } = useScreen();
  const { chatId } = useParams();

  return (
    <Layout $isMobile={isMobile}>
      <ConversationSide $show={!chatId}>
        <ConversationsList selectedUser={chatId} />
      </ConversationSide>
      <ChatSide $show={!!chatId}>
        <ChatWindow userId={chatId} />
      </ChatSide>
    </Layout>
  );
}

export default MessagesLayout;
