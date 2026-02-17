import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import styled from "styled-components";
import Button from "./Button";
import SearchInput from "./SearchInput";
import Logo from "./Logo";
import { useGetPage } from "../hooks/useGetPage";
import { useLocation } from "react-router-dom";
import { useScreen } from "../context/ScreenSizeContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

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

  const showSearch =
    pathname.startsWith("/messages") || pathname.startsWith("/discover");

  function handleLogout() {
    // TODO: wire up logout logic
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
          <Button size="medium" variation="danger" onClick={handleLogout}>
            <ButtonContent>
              <HiOutlineArrowRightOnRectangle />
              {!isMobile && <span>Logout</span>}
            </ButtonContent>
          </Button>
        </Buttons>
      </TopSection>

      {showSearch && <SearchInput />}
    </StyledHeader>
  );
}

export default Header;
