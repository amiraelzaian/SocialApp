import styled from "styled-components";
import { useEffect, useRef } from "react";
import PostCard from "./PostCard";
import { usePosts } from "./usePosts";
import Spinner from "../../ui/Spinner";

const Feed = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  padding: 2rem 5px;
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

function PostFeed() {
  const {
    posts,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts();

  const loaderRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  if (error) {
    return <EmptyState>Error loading posts: {error.message}</EmptyState>;
  }

  if (!posts.length) {
    return <EmptyState>No posts yet. Create your first post! 🎉</EmptyState>;
  }

  return (
    <Feed>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Loader div for infinite scroll */}
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

export default PostFeed;
