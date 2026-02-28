import styled from "styled-components";
import { useFollow } from "./useFollow";
import { HiMiniUserMinus, HiMiniUserPlus } from "react-icons/hi2";

const Wrapper = styled.div`
  padding: 8px 12px 12px;
  margin-top: auto;
`;

const FollowButton = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.2s;
  background: ${({ $isFollowing }) =>
    $isFollowing
      ? "var(--color-grey-200)"
      : "linear-gradient(135deg, #e91e8c, #9c27b0)"};
  color: ${({ $isFollowing }) =>
    $isFollowing ? "var(--color-grey-700)" : "white"};

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

function DiscoverCardTail({ data }) {
  const { toggleFollow, isFollowingUser, isPending } = useFollow(data?.id);

  return (
    <Wrapper>
      <FollowButton
        $isFollowing={isFollowingUser}
        onClick={(e) => {
          e.stopPropagation();
          toggleFollow();
        }}
        disabled={isPending}
      >
        {isFollowingUser ? (
          <>
            <HiMiniUserMinus /> Unfollow
          </>
        ) : (
          <>
            <HiMiniUserPlus /> Follow
          </>
        )}
      </FollowButton>
    </Wrapper>
  );
}

export default DiscoverCardTail;
