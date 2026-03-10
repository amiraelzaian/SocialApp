import styled, { css } from "styled-components";
import Avatar from "../../ui/Avatar";
import { messageDateConverter } from "../../utils/helpers";
import { useDeleteMessage } from "./useDeleteMessage";
import DeletePopup from "../../ui/DeletePopup";
import { useState, useRef } from "react";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin-bottom: 15px;
  flex-direction: ${({ $isOwn }) => ($isOwn ? "row-reverse" : "row")};
`;

const Bubble = styled.div`
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 30px;
  font-size: 14px;
  line-height: 1.5;

  word-break: normal;
  overflow-wrap: break-word;
  min-width: 60px;

  ${({ $isOwn }) =>
    $isOwn
      ? css`
          background: var(--color-brand-600);
          color: white;
          border-bottom-right-radius: 4px;
        `
      : css`
          background: var(--color-grey-50);
          color: var(--color-grey-700);
          border-bottom-left-radius: 4px;
        `}
`;

const Time = styled.p`
  font-size: 11px;
  color: var(--color-grey-400);
  margin-top: 4px;
  text-align: ${({ $isOwn }) => ($isOwn ? "right" : "left")};
`;

const BubbleGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ $isOwn }) => ($isOwn ? "flex-end" : "flex-start")};
`;

function MessageBubble({ message, currentUserId, userId }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const isOwn = message.sender_id === currentUserId;
  const time = messageDateConverter(message.created_at);
  const { deleteMessage } = useDeleteMessage();

  const pressTimer = useRef(null);

  function handleTouchStart() {
    if (!isOwn) return;
    pressTimer.current = setTimeout(() => setShowConfirm(true), 500);
  }
  function handleTouchEnd() {
    if (!isOwn) return;
    clearTimeout(pressTimer.current);
  }

  function handleDelete() {
    if (!isOwn) return;
    setShowConfirm(true);
  }

  return (
    <>
      <Wrapper
        $isOwn={isOwn}
        onDoubleClick={handleDelete}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Avatar
          src={message.sender?.avatar_url}
          name={message.sender?.full_name}
        />
        <BubbleGroup $isOwn={isOwn}>
          <Bubble $isOwn={isOwn}>{message.content}</Bubble>
          <Time $isOwn={isOwn}>{time}</Time>
        </BubbleGroup>
      </Wrapper>
      {showConfirm && (
        <DeletePopup
          onClose={() => setShowConfirm(false)}
          onConfirm={() =>
            deleteMessage({ messageId: message.id, otherUserId: userId })
          }
          message="Delete this message?"
        />
      )}
    </>
  );
}

export default MessageBubble;
