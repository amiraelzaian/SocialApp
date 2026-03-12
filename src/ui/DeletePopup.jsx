import styled from "styled-components";
import Button from "./Button";
import Modal from "./Modal";
import { useDeletePost } from "../features/posts/useDeletePost";

const StyledDiv = styled.div`
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
`;

const P = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

function DeletePopup({ post, onClose, onConfirm, message }) {
  const { removePost } = useDeletePost();

  function handleDelete() {
    if (onConfirm) {
      onConfirm();
    } else {
      removePost(post.id);
    }
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <StyledDiv onClick={(e) => e.stopPropagation()}>
        <P>{message || "Are you sure you want to delete this post?"}</P>
        <Buttons>
          <Button $size="medium" $variation="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button $size="medium" $variation="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Buttons>
      </StyledDiv>
    </Modal>
  );
}

export default DeletePopup;
