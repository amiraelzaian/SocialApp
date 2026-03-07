import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineCheckBadge,
  HiOutlineCheckCircle,
  HiOutlineTrash,
} from "react-icons/hi2";
import styled from "styled-components";
import Button from "./Button";
import SearchInput from "./SearchInput";
import Logo from "./Logo";
import Spinner from "./Spinner";
import { useGetPage } from "../hooks/useGetPage";
import { useLocation, useParams } from "react-router-dom";
import { useScreen } from "../context/ScreenSizeContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import NotificationCount from "./NotificationCount.jsx";
import { useLogout } from "../features/authentication/useLogout.js";
import MiniSpinner from "./MiniSpinner.jsx";
import { useUser } from "../features/authentication/useUser.js";

const StyledHeader = styled.header`
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  padding: 12px 24px;
  gap: 10px;
  border-bottom: 1px solid var(--color-grey-200);
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const H2 = styled.h2`
  color: var(--color-grey-600);
  margin: 0;
  font-size: 20px;
`;

const ButtonContent = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
`;

function Header() {
  const { nameOfPage } = useGetPage();
  const { isMobile } = useScreen();
  const { pathname } = useLocation();
  const { logout, isPending } = useLogout();
  const { id } = useParams();
  const { user } = useUser();
  const isOwnProfile = !id || id === user?.id;
  const inOtherUserProfile = nameOfPage === "Discover" && !isOwnProfile;

  const showSearch =
    pathname.startsWith("/messages") || pathname.startsWith("/discover");
  const showNumOfNotifications = pathname.startsWith("/notifications");

  function handleLogout() {
    logout();
  }

  return (
    <StyledHeader>
      <TopSection>
        {isMobile ? (
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        ) : (
          <H2>{nameOfPage}</H2>
        )}
        <Buttons>
          <ThemeToggle />
          {nameOfPage === "Home" && (
            <Button $size="medium" $variation="danger" onClick={handleLogout}>
              {isPending ? (
                <MiniSpinner />
              ) : (
                <ButtonContent>
                  <HiOutlineArrowRightOnRectangle />
                  {!isMobile && <span>Logout</span>}
                </ButtonContent>
              )}
            </Button>
          )}
          {/* {nameOfPage === "Notifications" && (
            <Button $size="small" $variation="outlined">
              <ButtonContent>
                {isMobile && <HiOutlineCheckBadge />}
                {!isMobile && <span>Mark all as read</span>}
              </ButtonContent>
            </Button>
          )} */}
          {/* {nameOfPage === "Notifications" && (
            <Button $size="small" $variation="outlined">
              <ButtonContent>
                {isMobile && <HiOutlineTrash />}
                {!isMobile && <span>Delete all</span>}
              </ButtonContent>
            </Button>
          )} */}
        </Buttons>
      </TopSection>
      {/* {showNumOfNotifications && <NotificationCount numOfNotificaitons={5} />} */}
      {showSearch && !inOtherUserProfile && <SearchInput />}
    </StyledHeader>
  );
}

export default Header;
