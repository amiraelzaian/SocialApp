import styled from "styled-components";
import FakeAvatar from "./FakeAvatar";

const StyledInfo = styled.div`
  display: flex;
  gap: 5px;
  position: fixed;
  bottom: 10px;
  left: 10px;
  flex-wrap: wrap;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  flex-wrap: wrap;
`;
const P = styled.p`
  font-size: 13px;
  color: var(--color-gray-400);
`;

function UserSidebarInfo() {
  return (
    <StyledInfo>
      <FakeAvatar>AZ</FakeAvatar>
      <UserInfo>
        <P>Amira Mohamed</P>
        <P>@amira</P>
      </UserInfo>
    </StyledInfo>
  );
}

export default UserSidebarInfo;
