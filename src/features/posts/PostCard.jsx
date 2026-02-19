import styled from "styled-components";
import PostCardCaption from "./PostCardCaption";
import PostCardHeader from "./PostCardHeader";
import PostCardActions from "./PostCardActions";
import PostCardImage from "./PostCardImage";

const Card = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 10px;
  overflow: hidden;
  margin: 5px auto;
`;

function PostCard({ post }) {
  return (
    <Card>
      <PostCardHeader post={post} />
      <PostCardCaption post={post} />
      <PostCardImage post={post} />
      <PostCardActions post={post} />
    </Card>
  );
}

export default PostCard;
