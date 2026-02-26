import styled from "styled-components";
import { useState } from "react";
import Avatar from "../../ui/Avatar";
import { useUser } from "../authentication/useUser";
import PostModal from "../../ui/PostModal";

const StyledBox = styled.div`
  margin: 15px auto 0;
  background-color: var(--color-grey-0);
  width: 94%;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  display: flex;
  gap: 1.2rem;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

const FakeInput = styled.button`
  flex: 1;
  background-color: var(--color-grey-100);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-full);
  padding: 1.2rem 2rem;

  font-family: inherit;
  font-size: 1.5rem;
  color: var(--color-grey-500);

  text-align: left;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-200);
    border-color: var(--color-grey-400);
  }

  &:focus,
  &:focus-visible,
  &:active {
    outline: none;
    border-color: var(--color-brand-600);
  }
`;

function CreatePost() {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);

  const firstName =
    user?.full_name?.split(" ")[0] ||
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.user_metadata?.username ||
    user?.username;

  const avatarUrl = user?.avatar_url || user?.user_metadata?.avatar_url;

  return (
    <>
      <StyledBox>
        <Avatar src={avatarUrl} alt={user?.username} name={user.full_name} />

        <FakeInput onClick={() => setShowModal(true)}>
          What's on your mind, {firstName}?
        </FakeInput>
      </StyledBox>

      {showModal && (
        <PostModal mode="create" onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default CreatePost;
