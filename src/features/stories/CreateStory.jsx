import styled from "styled-components";
import { useUser } from "../authentication/useUser";
import { useUserStories } from "./useUserStories";
import { HiPlus } from "react-icons/hi";

const StyledCircle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: relative;
  background-image: ${({ $avatar_url }) =>
    $avatar_url ? `url(${$avatar_url})` : "none"};
  background-size: cover;

  background-position: center;
  background-color: var(--color-brand-400);
  border: 3px solid
    ${({ $hasStories }) =>
      $hasStories ? "var(--color-brand-600)" : "var(--color-grey-200)"};
  cursor: pointer;
  flex-shrink: 0;
`;

const AddBtn = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  position: absolute;
  right: -6px;
  bottom: -6px;
  cursor: pointer;
  border: 1px solid var(--color-grey-200);
  box-shadow: var(--shadow-md);
  background-color: var(--color-brand-600);

  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  z-index: 1;
`;

const Label = styled.p`
  font-size: 11px;
  text-align: center;
  margin-top: 4px;
  color: var(--color-grey-600);
  width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function CreateStory({ onOpenCreate, onOpenViewer }) {
  const { user } = useUser();
  const { userStories } = useUserStories(user?.id);
  const hasStories = userStories?.length > 0;

  return (
    <Wrapper>
      <StyledCircle
        $avatar_url={user?.avatar_url}
        $hasStories={hasStories}
        onClick={() => hasStories && onOpenViewer(user?.id)}
      >
        <AddBtn
          onClick={(e) => {
            e.stopPropagation();
            onOpenCreate();
          }}
        >
          <HiPlus />
        </AddBtn>
      </StyledCircle>
      <Label>Your story</Label>
    </Wrapper>
  );
}

export default CreateStory;
