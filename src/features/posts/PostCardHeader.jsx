import styled from "styled-components";
import { HiDotsHorizontal } from "react-icons/hi";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.6rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Avatar = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  object-fit: cover;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 1.4rem;
  color: var(--color-grey-800);
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  color: var(--color-grey-600);

  &:hover {
    color: var(--color-grey-900);
  }
  &:focus {
    outline: none;
  }
`;

function PostCardHeader({ post }) {
  return (
    <Header>
      <UserInfo>
        <Avatar
          src={post.users?.avatar_url || "https://i.pravatar.cc/150"}
          alt={post.users?.username}
        />
        <UserDetails>
          <Username>{post.users?.username}</Username>
        </UserDetails>
      </UserInfo>

      <MenuButton>
        <HiDotsHorizontal size={24} />
      </MenuButton>
    </Header>
  );
}

export default PostCardHeader;
