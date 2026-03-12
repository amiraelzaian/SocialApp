import { HiArrowLeft, HiTrash } from "react-icons/hi";
import { useUserProfile } from "../discover/useUserProfile";
import styled from "styled-components";
import Avatar from "../../ui/Avatar";
import { useDeleteConversation } from "./useDeleteConversation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeletePopup from "../../ui/DeletePopup";
import { useUserStatus } from "../presence/useUserStatus";
import { convertLastSeen } from "../../utils/helpers";
import OnlineSign from "../../ui/onlineSign";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-shadow: var(--shadow-sm);
  border-bottom: 1px solid var(--color-grey-200);
  width: 100%;
  height: 60px;
  flex-shrink: 0;
  background-color: var(--color-grey-50);
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Username = styled.p`
  font-weight: bold;
  color: var(--color-grey-600);
  cursor: pointer;
`;
const Details = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
`;
const P = styled.p`
  font-size: 12px;
  color: ${({ $on }) =>
    $on ? "var(--color-green-100)" : " var(--color-grey-400)"};
`;
const Button = styled.button`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 40px;
  color: var(--color-brand-600);
  &:hover,
  &:active,
  &:focus {
    outline: none;
  }
`;
const Div = styled.div`
  position: relative;
`;
function ChatHeader({ userId }) {
  const { profileUser: user, isPending } = useUserProfile(userId);
  const navigate = useNavigate();
  const { deleteConversation } = useDeleteConversation(userId);
  const [showConfirm, setShowConfirm] = useState(false);
  const { userStatus } = useUserStatus(userId);

  const lastSeen = convertLastSeen(userStatus?.last_seen);
  const isOnline = userStatus?.is_online;
  console.log(lastSeen, isOnline);

  if (isPending) return null;

  function handleDelete() {
    deleteConversation();
    navigate("/messages");
  }

  return (
    <>
      <Header>
        <Content>
          <Button onClick={() => navigate("/messages")}>
            <HiArrowLeft size={20} />
          </Button>
          <Div>
            <Avatar src={user?.avatar_url} name={user?.full_name} />
            {isOnline && <OnlineSign />}
          </Div>
          <Details>
            <Username onClick={() => navigate(`/profile/${userId}`)}>
              {user?.username}
            </Username>
            <P $on={isOnline}>
              {lastSeen && !isOnline && lastSeen}
              {isOnline && `online`}
            </P>
          </Details>
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
