import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

const StyledCircle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: relative;
  background-image: ${({ $avatar_url }) =>
    $avatar_url ? `url(${$avatar_url})` : "none"};
  background-size: cover;
  background-position: center;
  background-color: var(--color-grey-200);
  border: 3px solid
    ${({ $hasViewed }) =>
      $hasViewed ? "var(--color-grey-300)" : "var(--color-brand-600)"};
  cursor: pointer;
  flex-shrink: 0;
`;

const Label = styled.p`
  font-size: 11px;
  color: var(--color-grey-600);
  width: 60px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function StoryCircle({ story, onClick }) {
  const user = story.users;

  return (
    <Wrapper onClick={onClick}>
      <StyledCircle
        $avatar_url={user?.avatar_url}
        $hasViewed={story.hasViewed}
      />
      <Label>{user?.username}</Label>
    </Wrapper>
  );
}

export default StoryCircle;
