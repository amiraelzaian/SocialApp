import styled from "styled-components";
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
  const { posts, isPending, error } = usePosts();

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

  if (!posts || posts.length === 0) {
    return <EmptyState>No posts yet. Create your first post! 🎉</EmptyState>;
  }

  return (
    <Feed>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Feed>
  );
}

export default PostFeed;
