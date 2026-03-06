import styled from "styled-components";
import { parseCaption } from "../../utils/parseText";

const Caption = styled.div`
  padding: 1rem 1.6rem 1.6rem;
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

const Hashtag = styled.span`
  color: var(--color-brand-600);
  font-weight: 500;
  margin-right: 0.4rem;
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

  &:focus {
    outline: none;
  }
`;

function PostCardCaption({ post, setShowCommentsBox }) {
  return (
    <Caption>
      <div>
        <Username>{post?.users?.username}</Username>

        <Text>
          {parseCaption(post?.caption)}{" "}
          {post?.hashtags?.map((tag) => (
            <Hashtag key={tag}>#{tag}</Hashtag>
          ))}
        </Text>
      </div>

      {post?.comments_count > 0 && (
        <CommentsLink
          onClick={() => {
            setShowCommentsBox((show) => !show);
          }}
        >
          View all {post?.comments_count} comments
        </CommentsLink>
      )}
    </Caption>
  );
}

export default PostCardCaption;
