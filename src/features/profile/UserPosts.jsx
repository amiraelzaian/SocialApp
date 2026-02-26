import styled from "styled-components";
import { useRef, useEffect } from "react";
import PostCard from "../posts/PostCard";
import { useUserPosts } from "./useUserPosts";
import { useUser } from "../authentication/useUser";
import Spinner from "../../ui/Spinner";

const Feed = styled.div`
  width: 95%;
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem 5px;
`;
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 4rem 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-grey-500);
`;

function UserPosts() {
  const { user } = useUser();
  const {
    userPosts,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserPosts(user?.id);

  const loaderRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage();
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isPending)
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );

  if (error)
    return <EmptyState>Error loading posts: {error.message}</EmptyState>;

  if (!userPosts.length) return <EmptyState>No posts yet 🎉</EmptyState>;

  return (
    <Feed>
      {userPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <div ref={loaderRef}>
        {isFetchingNextPage && (
          <LoadingContainer>
            <Spinner />
          </LoadingContainer>
        )}
      </div>
    </Feed>
  );
}

export default UserPosts;
