import PostFeed from "../features/posts/PostFeed";
import CreatePost from "../features/posts/CreatePost";
import styled from "styled-components";

const StyledHome = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 45px;
`;

function Home() {
  return (
    <StyledHome>
      <CreatePost />
      <PostFeed />
    </StyledHome>
  );
}

export default Home;
