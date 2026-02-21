import styled from "styled-components";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaRegPaperPlane,
} from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { useLike } from "./useLike";
import { useState } from "react";

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.6rem;
`;

const LeftActions = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.4rem;
  color: ${(props) =>
    props.$active ? "var(--color-brand-600)" : "var(--color-grey-800)"};
  transition: all 0.2s;

  &:hover {
    color: var(--color-grey-600);
  }

  &:focus {
    outline: none;
  }
`;

const LikesCount = styled.div`
  padding: 0 1.6rem;
  font-weight: 600;
  font-size: 1.4rem;
  color: var(--color-grey-800);
`;

function PostCardActions({ post, setShowCommentsBox }) {
  const { toggleLike } = useLike();
  const [isLiked, setIsLiked] = useState(false); // TODO: wire from API

  const handleLike = () => {
    toggleLike({ postId: post.id, isLiked });
    setIsLiked((v) => !v);
  };

  return (
    <>
      <Actions>
        <LeftActions>
          <ActionButton onClick={handleLike} $active={isLiked}>
            {isLiked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
          </ActionButton>

          <ActionButton onClick={() => setShowCommentsBox((show) => !show)}>
            <FaRegComment size={24} />
          </ActionButton>

          <ActionButton>
            <FaRegPaperPlane size={24} />
          </ActionButton>
        </LeftActions>

        <ActionButton>
          <FiBookmark size={24} />
        </ActionButton>
      </Actions>

      {post.likes_count > 0 && (
        <LikesCount>
          {post.likes_count} {post.likes_count === 1 ? "like" : "likes"}
        </LikesCount>
      )}
    </>
  );
}

export default PostCardActions;
