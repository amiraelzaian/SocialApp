import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useScreen } from "../context/ScreenSizeContext.jsx";

const Layout = styled.div`
  display: grid;
  grid-template-columns: ${({ $isMobile }) =>
    $isMobile ? "1fr" : "240px 1fr"};
  height: 100vh;
  background-color: var(--color-grey-100);
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: ${({ $isMobile }) => ($isMobile ? "80px" : "0")};
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
`;

function AppLayout() {
  const { isMobile } = useScreen();

  return (
    <Layout $isMobile={isMobile}>
      {/* Single Sidebar — handles its own mobile/desktop styling internally */}
      <Sidebar />

      <Main $isMobile={isMobile}>
        <Header />
        <ContentArea>
          <Outlet />
        </ContentArea>
      </Main>
    </Layout>
  );
}

export default AppLayout;
