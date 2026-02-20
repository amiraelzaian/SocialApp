import styled from "styled-components";
import { HiDotsHorizontal } from "react-icons/hi";
import Avatar from "../../ui/Avatar";
import { useUser } from "../authentication/useUser";
import { useState } from "react";
import Menu from "../../ui/Menu";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.6rem;
  position: relative;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
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
  border-radius: 50%;
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    background: var(--color-grey-100);
    color: var(--color-grey-900);
  }

  &:focus {
    outline: none;
  }
`;

function PostCardHeader({ post }) {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useUser();

  // Close menu when clicking outside
  const menuRef = useOutsideClick(() => setOpenMenu(false));

  const isOwner = user?.id === post.users?.id;

  return (
    <Header>
      <UserInfo>
        <Avatar src={post.users?.avatar_url} alt={post.users?.username} />
        <UserDetails>
          <Username>{post.users?.username || post.users?.full_name}</Username>
        </UserDetails>
      </UserInfo>

      {isOwner && (
        <div ref={menuRef} style={{ position: "relative" }}>
          <MenuButton onClick={() => setOpenMenu((open) => !open)}>
            <HiDotsHorizontal size={24} />
          </MenuButton>
          {openMenu && <Menu onClose={() => setOpenMenu(false)} post={post} />}
        </div>
      )}
    </Header>
  );
}

export default PostCardHeader;
