import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100vh;
  background-color: var(--color-grey-100);
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

function AppLayout() {
  return (
    <Layout>
      <Sidebar />
      <Main>
        <Header />
        <Outlet />
      </Main>
    </Layout>
  );
}

export default AppLayout;
