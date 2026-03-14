import { useState } from "react";
import styled from "styled-components";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { useUpdateComment } from "./useUpdateComment";
import { useDeleteComment } from "./useDeleteComment";
import { timeAgo } from "../../utils/helpers";
import Avatar from "../../ui/Avatar";

const Item = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1.6rem;
  animation: fadeIn 0.25s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

const Username = styled.span`
  font-weight: 700;
  font-size: 1.3rem;
  color: var(--color-grey-800);
  margin-right: 0.6rem;
`;

const CommentText = styled.span`
  font-size: 1.3rem;
  color: var(--color-grey-700);
  word-break: break-word;
`;

const Timestamp = styled.div`
  font-size: 1.1rem;
  color: var(--color-grey-500);
  margin-top: 0.3rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.4rem;
  opacity: 1;
  transition: opacity 0.2s;
`;

const IconBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-grey-500);
  padding: 0.3rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: all 0.15s;

  &:hover {
    color: ${(p) =>
      p.$danger ? "var(--color-red-700)" : "var(--color-brand-600)"};
    background: ${(p) =>
      p.$danger ? "var(--color-red-100)" : "var(--color-brand-50)"};
  }
`;

const EditInput = styled.input`
  flex: 1;
  border: 1px solid var(--color-brand-400);
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-size: 1.3rem;
  color: var(--color-grey-800);
  background: var(--color-grey-50);
  outline: none;

  &:focus {
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 2px var(--color-brand-100);
  }
`;

const EditRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.2rem;
`;

function CommentItem({ comment, postId, currentUserId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);
  const { editComment, isUpdating } = useUpdateComment(postId);
  const { removeComment, isDeleting } = useDeleteComment(postId);

  const isOwner = currentUserId === comment.user_id;
  const user = comment.users;

  const handleSave = () => {
    if (!editValue.trim() || editValue === comment.content) {
      setIsEditing(false);
      return;
    }
    editComment(
      { commentId: comment.id, content: editValue.trim() },
      { onSuccess: () => setIsEditing(false) },
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditValue(comment.content);
      setIsEditing(false);
    }
  };

  return (
    <Item>
      <Avatar
        src={user?.avatar_url}
        alt={user?.username}
        name={user.full_name}
      />

      <Body>
        {isEditing ? (
          <EditRow>
            <EditInput
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              disabled={isUpdating}
            />
            <IconBtn onClick={handleSave} disabled={isUpdating}>
              <FiCheck size={15} />
            </IconBtn>
            <IconBtn
              onClick={() => {
                setEditValue(comment.content);
                setIsEditing(false);
              }}
            >
              <FiX size={15} />
            </IconBtn>
          </EditRow>
        ) : (
          <>
            <Username>{user?.username || "user"}</Username>
            <CommentText>{comment.content}</CommentText>
          </>
        )}
        <Timestamp>{timeAgo(comment.created_at)}</Timestamp>
      </Body>

      {isOwner && !isEditing && (
        <Actions>
          <IconBtn onClick={() => setIsEditing(true)}>
            <FiEdit2 size={13} />
          </IconBtn>
          <IconBtn
            $danger
            onClick={() => removeComment(comment.id)}
            disabled={isDeleting}
          >
            <FiTrash2 size={13} />
          </IconBtn>
        </Actions>
      )}
    </Item>
  );
}

export default CommentItem;
