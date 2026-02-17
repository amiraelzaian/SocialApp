// Navbar.jsx
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import styled from "styled-components";
import Button from "./Button";
import SearchInput from "./SearchInput";
import { useGetPage } from "../hooks/useGetPage";

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

const Buttons = styled.div`
  display: flex;
  align-items: flex-end; /* fixed */
  gap: 10px;
`;

const H2 = styled.h2`
  color: var(--color-grey-600);
  margin: 0;
  font-size: 20px;
`;

function Navbar() {
  const { nameOfPage } = useGetPage();

  return (
    <StyledHeader>
      <TopSection>
        <H2>{nameOfPage}</H2>
        <Buttons>
          {/* Example: optional dark mode button */}
          {/* <Button size="medium" variation="outlined">
            <HiOutlineMoon />
          </Button> */}
          <Button size="medium" variation="danger">
            <HiOutlineArrowRightOnRectangle /> Logout
          </Button>
        </Buttons>
      </TopSection>

      {(nameOfPage === "Messages" || nameOfPage === "Discover") && (
        <SearchInput />
      )}
    </StyledHeader>
  );
}

export default Navbar;
