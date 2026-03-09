import styled, { css } from "styled-components";
import Avatar from "../../ui/Avatar";
import { messageDateConverter } from "../../utils/helpers";

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

function MessageBubble({ message, currentUserId }) {
  const isOwn = message.sender_id === currentUserId;
  const time = messageDateConverter(message.created_at);

  return (
    <Wrapper $isOwn={isOwn}>
      <Avatar
        src={message.sender?.avatar_url}
        name={message.sender?.full_name}
      />
      <BubbleGroup $isOwn={isOwn}>
        <Bubble $isOwn={isOwn}>{message.content}</Bubble>
        <Time $isOwn={isOwn}>{time}</Time>
      </BubbleGroup>
    </Wrapper>
  );
}

export default MessageBubble;
