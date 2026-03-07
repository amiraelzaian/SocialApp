import styled, { keyframes } from "styled-components";
import { useComments } from "./useComments";
import CommentItem from "./CommentItem";
import CreateComment from "./CreateComment";
import { useUser } from "../authentication/useUser";

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Box = styled.div`
  border-top: 1px solid var(--color-grey-100);
  animation: ${slideDown} 0.25s ease;
`;

const CommentsList = styled.div`
  max-height: 30rem;
  overflow-y: auto;

  /* subtle scrollbar */
  scrollbar-width: thin;
  scrollbar-color: var(--color-grey-300) transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 99px;
  }
`;

const Empty = styled.p`
  text-align: center;
  color: var(--color-grey-400);
  font-size: 1.3rem;
  padding: 2rem 0;
`;

const Spinner = styled.div`
  text-align: center;
  padding: 1.5rem;
  color: var(--color-grey-400);
  font-size: 1.3rem;
`;

// You'll want to pass currentUserId from your auth context in a real app
// For now we accept it as a prop or you can wire useUser() here
function CommentsBox({ post }) {
  const { comments, isPending } = useComments(post.id);
  const { user } = useUser();
  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <CommentsList>
        {isPending ? (
          <Spinner>Loading comments…</Spinner>
        ) : comments.length === 0 ? (
          <Empty>No comments yet. Be the first!</Empty>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={post.id}
              currentUserId={user?.id}
            />
          ))
        )}
      </CommentsList>
      <CreateComment postId={post.id} />
    </Box>
  );
}

export default CommentsBox;
