import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ScrollBtn from "./ScrollBtn.jsx";
import { useScreen } from "../context/ScreenSizeContext.jsx";
import { useGetPage } from "../hooks/useGetPage.js";
import { useRealtimeMessages } from "../features/messaging/useRealtimeMessages.js";
import { HiChevronUp } from "react-icons/hi2";
import { useRef, useState } from "react";

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
  position: relative;
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
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const { isMobile } = useScreen();
  const { nameOfPage } = useGetPage();
  const location = useLocation();
  const topRef = useRef(null);
  const contentRef = useRef(null);

  const isMessagesPage = nameOfPage === "Messages";
  const isInChat = location.pathname.startsWith("/messages/");

  useRealtimeMessages();

  function handleScroll() {
    const el = contentRef.current;
    if (!el) return;
    setShowScrollBtn(el.scrollTop > 100);
  }

  function scrollToTop() {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Layout $isMobile={isMobile}>
      <Sidebar hideSidebar={isInChat} />
      <Main $isMobile={isMobile}>
        {!(isInChat && isMobile) && nameOfPage !== "Profile" && <Header />}
        <ContentArea
          ref={contentRef}
          $noScroll={isMessagesPage}
          onScroll={handleScroll}
        >
          <div ref={topRef} />
          <Outlet />
        </ContentArea>

        {showScrollBtn && !isMessagesPage && (
          <ScrollBtn onClick={scrollToTop}>
            <HiChevronUp />
          </ScrollBtn>
        )}
      </Main>
    </Layout>
  );
}

export default AppLayout;
