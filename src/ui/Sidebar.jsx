import {
  HiOutlineBell,
  HiOutlineChartSquareBar,
  HiOutlineHome,
  HiOutlineSearch,
  HiOutlineUser,
} from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import Logo from "./Logo";
import styled from "styled-components";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

const Nav = styled.nav`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  width: 100%;
  background-color: var(--color-grey-50);
`;

function Sidebar() {
  return (
    <Nav>
      <Logo />
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
