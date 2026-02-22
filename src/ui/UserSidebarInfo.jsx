import styled from "styled-components";
import FakeAvatar from "./FakeAvatar";
import Avatar from "./Avatar";
import { useUser } from "../features/authentication/useUser";

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
  const { user } = useUser();
  console.log(user);

  return (
    <StyledInfo>
      <Avatar
        name={user.full_name}
        src={user.avatar_url}
        alt={user.full_name}
      />
      <UserInfo>
        <P>{user.full_name}</P>
        <P>{user.username}</P>
      </UserInfo>
    </StyledInfo>
  );
}

export default UserSidebarInfo;
