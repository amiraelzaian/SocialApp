import { HiArrowLeft, HiTrash } from "react-icons/hi";
import { useUserProfile } from "../discover/useUserProfile";
import styled from "styled-components";
import Avatar from "../../ui/Avatar";
import { useDeleteConversation } from "./useDeleteConversation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeletePopup from "../../ui/DeletePopup";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-grey-200);
  padding: 10px;
  width: 100%;
  height: 60px;
  background-color: var(--color-grey-50);
  position: sticky;
  top: 0;
  z-index: 2;
  opacity: 98%;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Username = styled.p`
  font-weight: bold;
  color: var(--color-grey-600);
  cursor: pointer;
`;

const Button = styled.button`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 40px;
  color: var(--color-brand-600);
  z-index: 3;

  &:hover,
  &:active,
  &:focus {
    outline: none;
  }
`;

function ChatHeader({ userId, onBack }) {
  const { profileUser: user, isPending } = useUserProfile(userId);
  const navigate = useNavigate();
  const { deleteConversation } = useDeleteConversation(userId);
  const [showConfirm, setShowConfirm] = useState(false);

  if (isPending) return null;

  function handleDelete() {
    deleteConversation();
    onBack();
  }

  return (
    <>
      <Header>
        <Content>
          <Button onClick={onBack}>
            <HiArrowLeft size={20} />
          </Button>
          <Avatar src={user?.avatar_url} name={user?.full_name} />
          <Username onClick={() => navigate(`/profile/${userId}`)}>
            {user?.username}
          </Username>
        </Content>
        <Button onClick={() => setShowConfirm(true)}>
          <HiTrash size={20} />
        </Button>
      </Header>

      {showConfirm && (
        <DeletePopup
          onClose={() => setShowConfirm(false)}
          onConfirm={handleDelete}
          message="Delete this entire conversation?"
        />
      )}
    </>
  );
}

export default ChatHeader;
