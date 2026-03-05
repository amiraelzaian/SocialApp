import styled from "styled-components";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { usePostById } from "../features/posts/usePostById";
import PostCardHeader from "../features/posts/PostCardHeader";
import PostCardImage from "../features/posts/PostCardImage";
import PostCardCaption from "../features/posts/PostCardCaption";
import PostCardActions from "../features/posts/PostCardActions";
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
  max-width: 600px;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Divider = styled.div`
  height: 1px;
  background: var(--color-grey-100);
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const HighlightedComment = styled.div`
  background: var(--color-brand-50);
  border-left: 3px solid var(--color-brand-600);
  transition: background 0.8s ease;
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
  const [showCommentsBox, setShowCommentsBox] = useState(true);
  const { postId } = useParams();
  const navigate = useMoveBack();
  const [searchParams] = useSearchParams();
  const commentId = searchParams.get("commentId");

  const { post, isPending: isPostPending } = usePostById(postId);
  const { comments, isPending: isCommentsPending } = useComments(postId);
  const { user } = useUser();

  const commentRef = useRef(null);

  // scroll to highlighted comment
  useEffect(() => {
    if (commentId && commentRef.current) {
      commentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [commentId, comments]);

  if (isPostPending) {
    return (
      <SpinnerWrap>
        <Spinner />
      </SpinnerWrap>
    );
  }

  if (!post) return null;

  return (
    <Page>
      <BackButton onClick={() => navigate()}>
        <HiArrowLeft size={18} />
        Back
      </BackButton>

      <Card>
        {/* Post */}
        <PostCardHeader post={post} />
        <PostCardImage post={post} />
        <PostCardCaption
          post={post}
          setShowCommentsBox={() => {
            setShowCommentsBox((show) => !show);
          }}
        />
        <PostCardActions
          post={post}
          setShowCommentsBox={() => {
            setShowCommentsBox((show) => !show);
          }}
        />

        <Divider />

        {/* Comments */}
        {showCommentsBox && (
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
          </CommentsList>
        )}

        <CreateComment postId={post.id} />
      </Card>
    </Page>
  );
}

export default PostDetails;
