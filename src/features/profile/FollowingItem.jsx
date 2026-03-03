import styled from "styled-components";
import Avatar from "../../ui/Avatar";
import Button from "../../ui/Button";
import { useFollow } from "../discover/useFollow";
import { Link } from "react-router-dom";
import ListItem from "../../ui/ListItem";
import { HiMiniUserMinus, HiMiniUserPlus } from "react-icons/hi2";

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const P = styled.p`
  color: var(--color-grey-600);
  font-size: 15px;
  margin: 0;
`;

export default function FollowingItem({ followedUser, currentUserId }) {
  const { isFollowingUser, toggleFollow, isPending } = useFollow(
    followedUser.id,
  );

  function handleFollowClick(e) {
    e.stopPropagation();
    toggleFollow();
  }

  return (
    <ListItem>
      <UserInfo>
        <Avatar
          src={followedUser.avatar_url}
          name={followedUser.full_name}
          alt={followedUser.username}
        />
        <Link to={`/profile/${followedUser.id}`}>
          <P>{followedUser.full_name}</P>
        </Link>
      </UserInfo>
      <Button
        onClick={handleFollowClick}
        $variation="secondary"
        disabled={isPending}
      >
        {isFollowingUser ? (
          <>
            <HiMiniUserMinus /> Following
          </>
        ) : (
          <>
            <HiMiniUserPlus /> Follow
          </>
        )}
      </Button>
    </ListItem>
  );
}
