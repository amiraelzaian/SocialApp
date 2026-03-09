import { useState } from "react";
import styled from "styled-components";
import { useScreen } from "../../context/ScreenSizeContext";
import ConversationsList from "./ConversationsList";
import ChatWindow from "./ChatWindow";

const Layout = styled.div`
  display: grid;
  grid-template-columns: ${({ $isMobile }) =>
    $isMobile ? "1fr" : "320px 1fr"};
  height: 100vh;
`;

const ConversationSide = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: var(--color-grey-50);
  border: 2px solid var(--color-grey-200);

  @media (max-width: 768px) {
    display: ${({ $show }) => ($show ? "flex" : "none")};
  }
`;

const ChatSide = styled.div`
  @media (max-width: 768px) {
    display: ${({ $show }) => ($show ? "block" : "none")};
  }
`;

function MessagesLayout() {
  const { isMobile } = useScreen();
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Layout $isMobile={isMobile}>
      <ConversationSide $show={!selectedUser}>
        <ConversationsList onSelect={setSelectedUser} />
      </ConversationSide>

      <ChatSide $show={!!selectedUser}>
        <ChatWindow
          userId={selectedUser}
          onBack={() => setSelectedUser(null)}
        />
      </ChatSide>
    </Layout>
  );
}

export default MessagesLayout;
