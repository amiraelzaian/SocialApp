import styled from "styled-components";
import MenuItem from "./MenuItem";
import { useState } from "react";
import PostModal from "./PostModal";

const StyledMenu = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.6rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  position: absolute;
  right: 0;
  top: calc(100% + 0.8rem);
  z-index: 20;
  box-shadow: var(--shadow-md);
  min-width: 15rem;
`;

function Menu({ onClose, post }) {
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <>
      <StyledMenu>
        <MenuItem
          onClick={() => {
            setShowEditModal((show) => !show);
          }}
        >
          Edit post
        </MenuItem>
        <MenuItem onClick={onClose} danger>
          Delete post
        </MenuItem>
      </StyledMenu>
      {showEditModal && (
        <PostModal
          mode="edit"
          post={post}
          onClose={() => {
            setShowEditModal(false);
            onClose();
          }}
        />
      )}
    </>
  );
}

export default Menu;
