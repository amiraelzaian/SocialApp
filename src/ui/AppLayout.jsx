import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useScreen } from "../context/ScreenSizeContext.jsx";
import { useGetPage } from "../hooks/useGetPage.js";
import { useRealtimeMessages } from "../features/messaging/useRealtimeMessages.js";

const Layout = styled.div`
  display: grid;
  grid-template-columns: ${({ $isMobile }) =>
    $isMobile ? "1fr" : "240px 1fr"};
  height: 100vh;
  background-color: var(--color-grey-100);
  overflow: hidden;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  padding-bottom: ${({ $isMobile }) => ($isMobile ? "5px" : "0")};
`;

const ContentArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: ${({ $noScroll }) => ($noScroll ? "hidden" : "scroll")};
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function AppLayout() {
  const { isMobile } = useScreen();
  const { nameOfPage } = useGetPage();
  const location = useLocation();

  const isMessagesPage = nameOfPage === "Messages";
  // ✅ in chat if path is /messages/someId (not just /messages)
  const isInChat = location.pathname.startsWith("/messages/");

  useRealtimeMessages(); // ✅ always runs regardless of page

  return (
    <Layout $isMobile={isMobile}>
      <Sidebar hideSidebar={isInChat} />
      <Main $isMobile={isMobile}>
        {!(isInChat && isMobile) && nameOfPage !== "Profile" && <Header />}
        <ContentArea $noScroll={isMessagesPage}>
          <Outlet />
        </ContentArea>
      </Main>
    </Layout>
  );
}

export default AppLayout;
