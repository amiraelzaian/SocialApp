import styled from "styled-components";
import CreateStory from "./CreateStory";
import StoriesList from "./StoriesList";
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
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

function Storybar() {
  const [openViewer, setOpenViewer] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <StyledBox>
      <CreateStory
        onOpenViewer={() => setOpenViewer(true)}
        onOpenCreate={() => setOpenCreate(true)}
      />
      <StoriesList />
      {openCreate && <CreateStoryModal onClose={() => setOpenCreate(false)} />}
    </StyledBox>
  );
}

export default Storybar;
