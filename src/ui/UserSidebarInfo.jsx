import styled from "styled-components";
import FakeAvatar from "./FakeAvatar";

const StyledInfo = styled.div`
  display: flex;
  gap: 2px;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  flex-wrap: wrap;
`;
const P = styled.p`
  font-size: 13px;
  color: var(--color-gray-500);
`;

function UserSidebarInfo() {
  return (
    <StyledInfo>
      <FakeAvatar>AZ</FakeAvatar>
      <UserInfo>
        <P>_amira</P>
        <P>amira@gmail.com</P>
      </UserInfo>
    </StyledInfo>
  );
}

export default UserSidebarInfo;
