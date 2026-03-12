import styled from "styled-components";
import { useStories } from "./useStories";
import StoryCircle from "./StoryCircle";
import MiniSpinner from "../../ui/MiniSpinner";

const StyledList = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  flex: 1;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

function StoriesList({ onOpenViewer }) {
  const { stories, isPending } = useStories();

  const uniqueStories = stories
    ?.filter(
      (story, index, self) =>
        index === self.findIndex((s) => s.user_id === story.user_id),
    )
    .toSorted();
  if (isPending)
    return (
      <Loading>
        <MiniSpinner />
      </Loading>
    );

  return (
    <StyledList>
      {uniqueStories?.map((story) => (
        <StoryCircle
          story={story}
          key={story.id}
          onClick={() => onOpenViewer(story.user_id)}
        />
      ))}
    </StyledList>
  );
}

export default StoriesList;
