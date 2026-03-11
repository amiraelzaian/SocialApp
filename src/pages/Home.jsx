import PostFeed from "../features/posts/PostFeed";
import CreatePost from "../features/posts/CreatePost";
import styled from "styled-components";
import Storybar from "../features/stories/Storybar";

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
      <Storybar />
      <CreatePost />
      <PostFeed />
    </StyledHome>
  );
}

export default Home;
