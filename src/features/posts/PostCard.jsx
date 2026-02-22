import styled from "styled-components";
import PostCardCaption from "./PostCardCaption";
import PostCardHeader from "./PostCardHeader";
import PostCardActions from "./PostCardActions";
import PostCardImage from "./PostCardImage";
import CommentsBox from "./CommentsBox";
import { useState } from "react";

const Card = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  margin: 5px auto;
  transition: box-shadow 0.2s;

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

const RepostLabel = styled.p`
  font-size: 1.2rem;
  color: var(--color-grey-500);
  padding: 0.8rem 1.6rem 0;
`;

function PostCard({ post }) {
  const [showCommentsBox, setShowCommentsBox] = useState(false);

  if (post.is_repost) {
    return (
      <Card>
        <PostCardHeader post={post} />

        {/* Original post embedded */}
        <OriginalPostEmbed>
          <PostCardHeader post={post.original_post} />
          <PostCardImage post={post.original_post} />
          <PostCardCaption
            post={post.original_post}
            setShowCommentsBox={() => {}}
          />
        </OriginalPostEmbed>

        {/* Actions belong to the repost */}
        <PostCardActions post={post} setShowCommentsBox={setShowCommentsBox} />
        {showCommentsBox && <CommentsBox post={post} />}
      </Card>
    );
  }

  return (
    <Card>
      <PostCardHeader post={post} />
      <PostCardImage post={post} />
      <PostCardCaption post={post} setShowCommentsBox={setShowCommentsBox} />
      <PostCardActions post={post} setShowCommentsBox={setShowCommentsBox} />
      {showCommentsBox && <CommentsBox post={post} />}
    </Card>
  );
}

export default PostCard;
