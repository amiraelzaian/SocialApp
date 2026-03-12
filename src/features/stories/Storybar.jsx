import styled from "styled-components";
import CreateStory from "./CreateStory";
import StoriesList from "./StoriesList";
import StoryViewer from "./StoryViewer";
import { useState } from "react";
import CreateStoryModal from "./CreateStoryModal";

const StyledBox = styled.div`
  margin: 15px auto 0;
  background-color: var(--color-grey-0);
  width: 94%;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  display: flex;
  gap: 15px;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

function Storybar() {
  const [viewingUserId, setViewingUserId] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <StyledBox>
      <CreateStory
        onOpenViewer={(userId) => setViewingUserId(userId)}
        onOpenCreate={() => setOpenCreate(true)}
      />
      <StoriesList onOpenViewer={(userId) => setViewingUserId(userId)} />

      {openCreate && <CreateStoryModal onClose={() => setOpenCreate(false)} />}
      {viewingUserId && (
        <StoryViewer
          userId={viewingUserId}
          onClose={() => setViewingUserId(null)}
        />
      )}
    </StyledBox>
  );
}

export default Storybar;
