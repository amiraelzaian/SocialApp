import styled from "styled-components";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { usePostById } from "../features/posts/usePostById";
import PostCard from "../features/posts/PostCard";
import CommentItem from "../features/posts/CommentItem";
import CreateComment from "../features/posts/CreateComment";
import { useComments } from "../features/posts/useComments";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useMoveBack } from "../hooks/useMoveBack";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0 4rem;
  width: 100%;
  padding-bottom: 45px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-grey-700);
  font-size: 1.4rem;
  font-weight: 600;
  padding: 1rem 1.6rem;
  border-radius: var(--border-radius-md);
  transition: background 0.2s;
  align-self: flex-start;
  margin-left: 2%;

  &:hover {
    background: var(--color-grey-100);
  }
  &:focus {
    outline: none;
  }
`;

const Card = styled.div`
  width: 95%;
  overflow: hidden;
`;

const Divider = styled.div`
  height: 1px;
  background: var(--color-grey-100);
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  margin-top: 1rem;
`;

const HighlightedComment = styled.div`
  background: var(--color-grey-200);
  border-left: 3px solid var(--color-brand-600);
`;

const Empty = styled.p`
  text-align: center;
  color: var(--color-grey-400);
  font-size: 1.3rem;
  padding: 2rem 0;
`;

const SpinnerWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 6rem 0;
`;

function PostDetails() {
  const { postId } = useParams();
  const navigate = useMoveBack();
  const [searchParams] = useSearchParams();
  const commentId = searchParams.get("commentId");

  const { post, isPending: isPostPending } = usePostById(postId);
  const { comments, isPending: isCommentsPending } = useComments(postId);
  const { user } = useUser();
  const commentRef = useRef(null);

  // scroll to highlighted comment once comments load
  useEffect(() => {
    if (commentId && commentRef.current) {
      commentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [commentId, comments]); // reruns when comments load ✅

  if (isPostPending)
    return (
      <SpinnerWrap>
        <Spinner />
      </SpinnerWrap>
    );
  if (!post) return null;

  return (
    <Page>
      <BackButton onClick={() => navigate()}>
        <HiArrowLeft size={18} />
        Back
      </BackButton>

      <Card>
        <PostCard post={post} disableClick />

        <CommentsList>
          {isCommentsPending ? (
            <SpinnerWrap>
              <Spinner />
            </SpinnerWrap>
          ) : comments.length === 0 ? (
            <Empty>No comments yet. Be the first!</Empty>
          ) : (
            comments.map((comment) => {
              const isHighlighted = comment.id === commentId;
              return isHighlighted ? (
                // 👇 ref attaches to the highlighted comment's DOM node
                <HighlightedComment key={comment.id} ref={commentRef}>
                  <CommentItem
                    comment={comment}
                    postId={post.id}
                    currentUserId={user?.id}
                  />
                </HighlightedComment>
              ) : (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  postId={post.id}
                  currentUserId={user?.id}
                />
              );
            })
          )}
          <CreateComment postId={post.id} />
        </CommentsList>
      </Card>
    </Page>
  );
}

export default PostDetails;
