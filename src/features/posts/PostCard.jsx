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
`;

// Pass currentUserId from your auth context/hook
// e.g. const { user } = useUser();  →  currentUserId={user?.id}
function PostCard({ post }) {
  const [showCommentsBox, setShowCommentsBox] = useState(false);

  return (
    <Card>
      <PostCardHeader post={post} />
      <PostCardImage post={post} />
      <PostCardCaption post={post} />
      <PostCardActions post={post} setShowCommentsBox={setShowCommentsBox} />
      {showCommentsBox && <CommentsBox post={post} />}
    </Card>
  );
}

export default PostCard;
