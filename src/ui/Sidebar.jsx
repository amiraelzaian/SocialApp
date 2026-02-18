import {
  HiOutlineBell,
  HiOutlineHome,
  HiOutlineSearch,
  HiOutlineUser,
} from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import Logo from "./Logo";
import styled from "styled-components";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { useScreen } from "../context/ScreenSizeContext.jsx";

const Nav = styled.nav`
  display: flex;

  align-items: center;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "row" : "column")};
  padding: 5px;
  background-color: var(--color-grey-50);
  flex-wrap: nowrap;
  overflow: hidden;

  ${({ $isMobile }) =>
    $isMobile &&
    `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 95%;
      height: 60px;
      z-index: 10;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      justify-content: center;
      padding: 2px;
    `}
`;

function Sidebar() {
  const { isMobile } = useScreen();

  return (
    <Nav $isMobile={isMobile}>
      {!isMobile && <Logo />}
      <ButtonIcon to="/" icon={<HiOutlineHome />}>
        Home
      </ButtonIcon>
      <ButtonIcon to="/discover" icon={<HiOutlineSearch />}>
        Discover
      </ButtonIcon>
      <ButtonIcon to="/messages" icon={<HiOutlineChatBubbleLeftRight />}>
        Messages
      </ButtonIcon>
      <ButtonIcon to="/notifications" icon={<HiOutlineBell />}>
        Notifications
      </ButtonIcon>
      <ButtonIcon to="/profile" icon={<HiOutlineUser />}>
        Profile
      </ButtonIcon>
    </Nav>
  );
}

export default Sidebar;
