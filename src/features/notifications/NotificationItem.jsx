import styled from "styled-components";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { HiXMark } from "react-icons/hi2";
import Avatar from "../../ui/Avatar";
import { timeAgo } from "../../utils/helpers";
import { useDeleteNotification } from "./useDeleteNotification";
import { useMarkAsRead } from "./useMarkAsRead";
import { useNavigate } from "react-router-dom";
import { useFollow } from "../discover/useFollow";

const typeConfig = {
  like: { icon: <FaHeart />, color: "var(--color-red-700)" },
  comment: { icon: <FaRegComment />, color: "var(--color-green-700)" },
  follow: { icon: <HiUserAdd />, color: "var(--color-brand-600)" },
};

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.4rem 1.6rem;
  background: ${({ $unread }) =>
    $unread ? "var(--color-grey-50)" : "transparent"};
  border-bottom: 1px solid var(--color-grey-100);
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: var(--color-grey-50);
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.p`
  font-size: 1.3rem;
  color: var(--color-grey-700);

  span {
    font-weight: 700;
    color: var(--color-grey-900);
  }
`;

const Time = styled.span`
  font-size: 1.1rem;
  color: var(--color-grey-400);
`;

const PostPreview = styled.p`
  font-size: 1.2rem;
  color: var(--color-grey-500);
  font-style: italic;
`;

const FollowBackBtn = styled.button`
  padding: 0.5rem 1.4rem;
  background: var(--color-brand-600);
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.4rem;
  width: fit-content;

  &:hover {
    background: var(--color-brand-700);
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const TypeIcon = styled.span`
  font-size: 1.6rem;
  color: ${({ $color }) => $color};
`;

const UnreadDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-brand-600);
  flex-shrink: 0;
`;

const DeleteBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-grey-400);
  display: flex;
  align-items: center;
  padding: 0.2rem;

  &:hover {
    color: var(--color-red-700);
  }
`;

const actionText = {
  like: "liked your post",
  comment: "commented on your post",
  follow: "started following you",
};

function NotificationItem({ notification }) {
  const { actor, type, posts, is_read, created_at, message, id, comment_id } =
    notification;
  const config = typeConfig[type] || {};

  const { deleteNotification, isPending: isDeleting } = useDeleteNotification();
  const { toggleFollow, isFollowingUser } = useFollow(actor.id);
  const { markAsRead } = useMarkAsRead();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!is_read) markAsRead(id);
    if (type === "like") navigate(`/posts/${posts.id}`);
    if (type === "comment")
      navigate(`/posts/${posts.id}?commentId=${comment_id}`);
    if (type === "follow") navigate(`/profile/${actor.id}`);
  };

  return (
    <Wrapper $unread={!is_read} onClick={handleClick}>
      <Avatar
        src={actor?.avatar_url}
        alt={actor?.username}
        name={actor?.full_name}
      />

      <Content>
        <TopRow>
          <Text>
            <span>{actor?.username}</span> {actionText[type]}
          </Text>
          <Time>{timeAgo(created_at)}</Time>
        </TopRow>

        {posts?.caption && (
          <PostPreview>"{posts.caption.slice(0, 60)}..."</PostPreview>
        )}

        {type === "comment" && message && (
          <PostPreview>"{message}"</PostPreview>
        )}

        {type === "follow" && (
          <FollowBackBtn
            onClick={(e) => {
              e.stopPropagation();
              toggleFollow();
            }}
          >
            {isFollowingUser ? "Following" : " Follow Back"}
          </FollowBackBtn>
        )}
      </Content>

      <RightSide>
        <TypeIcon $color={config.color}>{config.icon}</TypeIcon>
        {!is_read && <UnreadDot />}
        <DeleteBtn
          disabled={isDeleting}
          onClick={(e) => {
            e.stopPropagation();
            deleteNotification(id);
          }}
        >
          <HiXMark size={16} />
        </DeleteBtn>
      </RightSide>
    </Wrapper>
  );
}

export default NotificationItem;
