import { HiArrowLeft, HiTrash } from "react-icons/hi";
import { useUserProfile } from "../discover/useUserProfile";
import styled from "styled-components";
import Avatar from "../../ui/Avatar";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-grey-200);
  width: 100%;
  height: fit-content;
  background-color: var(--color-grey-50);
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Username = styled.p`
  font-weight: bold;
  color: var(--color-grey-600);
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

function ChatHeader({ userId, onBack }) {
  const { profileUser: user, isPending } = useUserProfile(userId);

  if (isPending) return null;

  return (
    <Header>
      <Content>
        <Button onClick={onBack}>
          <HiArrowLeft size={20} />
        </Button>
        <Avatar src={user?.avatar_url} name={user?.full_name} />
        <Username>{user?.username}</Username>
      </Content>
      <Button>
        <HiTrash size={20} />
      </Button>
    </Header>
  );
}

export default ChatHeader;
