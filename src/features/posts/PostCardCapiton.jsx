import styled from "styled-components";
import { parseCaption } from "../../utils/parseText";

const Caption = styled.div`
  padding: 0 1.6rem 1.6rem;
`;

const Username = styled.span`
  font-weight: 600;
  margin-right: 0.8rem;
  color: var(--color-grey-800);
`;

const Text = styled.span`
  color: var(--color-grey-700);
  line-height: 1.6;
`;

const CommentsLink = styled.button`
  background: none;
  border: none;
  color: var(--color-grey-500);
  cursor: pointer;
  margin-top: 0.8rem;
  display: block;
  font-size: 1.4rem;

  &:hover {
    color: var(--color-grey-700);
  }
`;

function PostCardCaption({ post }) {
  return (
    <Caption>
      <div>
        <Username>{post.users?.username}</Username>
        <Text>{parseCaption(post.caption)}</Text>
      </div>

      {post.comments_count > 0 && (
        <CommentsLink>View all {post.comments_count} comments</CommentsLink>
      )}
    </Caption>
  );
}

export default PostCardCaption;
