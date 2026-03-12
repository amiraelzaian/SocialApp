import styled from "styled-components";
import { useScreen } from "../../context/ScreenSizeContext";
import Modal from "../../ui/Modal";
import { Title } from "../../ui/PostModal";
import { useStoryViewers } from "./useStoryViewers";
import MiniSpinner from "../../ui/MiniSpinner";
import Avatar from "../../ui/Avatar";
import { useNavigate } from "react-router-dom";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { HiEye } from "react-icons/hi";
import { useUser } from "../authentication/useUser";

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const ViewCount = styled.span`
  font-size: 13px;
  color: var(--color-grey-400);
  font-weight: 500;
`;

const Viewers = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Viewer = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  transition: background 0.2s;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Username = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-grey-700);
`;

const FullName = styled.p`
  font-size: 12px;
  color: var(--color-grey-400);
`;

const MessageBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 20px;
  border: 1.5px solid var(--color-brand-600);
  background: transparent;
  color: var(--color-brand-600);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  background-color: var(--color-grey-100);
  &:hover {
    background: var(--color-brand-600);
    color: white;
  }
`;

const Empty = styled.p`
  text-align: center;
  color: var(--color-grey-400);
  font-size: 14px;
  padding: 20px 0;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

function ViewsModal({ onClose, story }) {
  const { isMobile } = useScreen();
  const { viewers, isPending } = useStoryViewers(story.id);
  const navigate = useNavigate();

  const { user } = useUser();

  return (
    <Modal onClose={onClose}>
      <Header>
        <Title $isMobile={isMobile} style={{ margin: 0 }}>
          Story Views
        </Title>
        {!isPending && (
          <ViewCount>
            <HiEye style={{ verticalAlign: "middle" }} /> {viewers?.length || 0}
          </ViewCount>
        )}
      </Header>

      {isPending ? (
        <Loading>
          <MiniSpinner />
        </Loading>
      ) : viewers?.length === 0 ? (
        <Empty>No views yet 👀</Empty>
      ) : (
        <Viewers>
          {viewers?.map((v) => (
            <Viewer key={v.id}>
              <Avatar src={v.users?.avatar_url} name={v.users?.full_name} />
              <Info>
                <Username>{v.users?.username}</Username>
                <FullName>
                  {v.users.id === user.id
                    ? `${v.users.full_name} (you)`
                    : v.users.full_name}
                </FullName>
              </Info>
              {v.users.id !== user.id && (
                <MessageBtn
                  onClick={() => {
                    navigate(`/messages/${v.users?.id}`);
                    onClose();
                  }}
                >
                  <HiOutlineChatBubbleLeftRight size={14} />
                  Message
                </MessageBtn>
              )}
            </Viewer>
          ))}
        </Viewers>
      )}
    </Modal>
  );
}

export default ViewsModal;
