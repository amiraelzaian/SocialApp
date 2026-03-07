import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPage } from "../../hooks/useGetPage";
import PostCardCaption from "./PostCardCaption";
import PostCardHeader from "./PostCardHeader";
import PostCardActions from "./PostCardActions";
import PostCardImage from "./PostCardImage";
import CommentsBox from "./CommentsBox";

const Card = styled.div`
  width: 100%;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  margin: 5px auto;
  transition: box-shadow 0.2s;
  cursor: ${({ $disableClick }) => ($disableClick ? "default" : "pointer")};

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
  }

  animation: fadeIn 0.25s ease;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const OriginalPostEmbed = styled.div`
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  margin: 0 1.6rem 1.2rem;
  overflow: hidden;
`;

function PostCard({ post, disableClick = false }) {
 const { nameOfPage } = useGetPage();
 const [showCommentsBox, setShowCommentsBox] = useState(nameOfPage === "Post");
  const navigate = useNavigate();

  if (!post) return null;

  const handleCardClick = () => {
    if (disableClick) return;
    navigate(`/posts/${post.id}`);
  };

  const handleOriginalClick = (e) => {
    e.stopPropagation();
    if (disableClick) return;
    navigate(`/posts/${post.original_post_id}`);
  };

  if (post.is_repost) {
    return (
      <Card onClick={handleCardClick} $disableClick={disableClick}>
        <PostCardHeader post={post} />
        {post.original_post && (
          <OriginalPostEmbed onClick={handleOriginalClick}>
            <PostCardHeader post={post.original_post} />
            <PostCardImage post={post.original_post} />
            <PostCardCaption
              post={post.original_post}
              setShowCommentsBox={() => {}}
            />
          </OriginalPostEmbed>
        )}
        <PostCardActions post={post} setShowCommentsBox={setShowCommentsBox} />
        {showCommentsBox && <CommentsBox post={post} />}
      </Card>
    );
  }

  return (
    <Card onClick={handleCardClick} $disableClick={disableClick}>
      <PostCardHeader post={post} />
      <PostCardImage post={post} />
      <PostCardCaption post={post} setShowCommentsBox={setShowCommentsBox} />
      <PostCardActions post={post} setShowCommentsBox={setShowCommentsBox} />
      {showCommentsBox && <CommentsBox post={post} />}
    </Card>
  );
}

export default PostCard;
