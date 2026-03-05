import styled from "styled-components";
import { HiDotsHorizontal } from "react-icons/hi";
import Avatar from "../../ui/Avatar";
import { useUser } from "../authentication/useUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../ui/Menu";
import DeletePopup from "../../ui/DeletePopup";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import PostModal from "../../ui/PostModal";

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
  cursor: pointer;
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const menuRef = useOutsideClick(() => setOpenMenu(false));
  const isOwner = user?.id === post.users?.id;

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate(`/profile/${post.users?.id}`);
  };

  return (
    <Header onClick={(e) => e.stopPropagation()}>
      <UserInfo onClick={handleProfileClick}>
        <Avatar
          src={post.users?.avatar_url}
          alt={post.users?.username}
          name={post.users?.full_name}
        />
        <UserDetails>
          <Username>{post.users?.username || post.users?.full_name}</Username>
        </UserDetails>
      </UserInfo>

      {isOwner && (
        <div
          ref={menuRef}
          style={{ position: "relative" }}
          onClick={(e) => e.stopPropagation()}
        >
          <MenuButton onClick={() => setOpenMenu((open) => !open)}>
            <HiDotsHorizontal size={24} />
          </MenuButton>

          {openMenu && (
            <Menu
              onDelete={() => {
                setOpenMenu(false);
                setShowDeleteModal(true);
              }}
              onEdit={() => {
                setOpenMenu(false);
                setShowEditModal(true);
              }}
            />
          )}
        </div>
      )}

      {showDeleteModal && (
        <DeletePopup post={post} onClose={() => setShowDeleteModal(false)} />
      )}
      {showEditModal && (
        <PostModal
          mode="edit"
          post={post}
          onClose={() => {
            setShowEditModal(false);
            setOpenMenu(false);
          }}
        />
      )}
    </Header>
  );
}

export default PostCardHeader;
