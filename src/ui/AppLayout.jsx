import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useScreen } from "../context/ScreenSizeContext.jsx";
import { useGetPage } from "../hooks/useGetPage.js";

const Layout = styled.div`
  display: grid;
  grid-template-columns: ${({ $isMobile }) =>
    $isMobile ? "1fr" : "240px 1fr"};
  height: 100vh;
  background-color: var(--color-grey-100);
  overflow: hidden; /* ✅ Prevent layout scroll */
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  padding-bottom: ${({ $isMobile }) => ($isMobile ? "80px" : "0")};
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey-100);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-400);
    border-radius: 10px;

    &:hover {
      background: var(--color-grey-500);
    }
  }

  scrollbar-width: thin;
  scrollbar-color: var(--color-grey-400) var(--color-grey-100);

  scroll-behavior: smooth;
`;

function AppLayout() {
  const { isMobile } = useScreen();
  const { nameOfPage } = useGetPage();

  return (
    <Layout $isMobile={isMobile}>
      <Sidebar />

      <Main $isMobile={isMobile}>
        {nameOfPage !== "Profile" && <Header />}
        <ContentArea>
          <Outlet />
        </ContentArea>
      </Main>
    </Layout>
  );
}

export default AppLayout;
