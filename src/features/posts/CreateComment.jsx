import { useState } from "react";
import styled from "styled-components";
import { FiSend } from "react-icons/fi";
import { useCreateComment } from "./useCreateComment";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.6rem;
  border-top: 1px solid var(--color-grey-100);
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.4rem;
  color: var(--color-grey-800);
  background: transparent;
  padding: 0.4rem 0;

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

const SendBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(p) =>
    p.$active ? "var(--color-brand-600)" : "var(--color-grey-400)"};
  padding: 0.4rem;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  font-weight: 700;
  font-size: 1.3rem;

  &:hover:not(:disabled) {
    color: var(--color-brand-700);
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

function CreateComment({ postId }) {
  const [content, setContent] = useState("");
  const { addComment, isCreating } = useCreateComment(postId);

  const handleSubmit = () => {
    if (!content.trim()) return;
    addComment(
      { postId, content: content.trim() },
      { onSuccess: () => setContent("") },
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <Wrapper>
      <Input
        placeholder="Add a comment…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isCreating}
      />
      <SendBtn
        onClick={handleSubmit}
        disabled={!content.trim() || isCreating}
        $active={!!content.trim()}
      >
        <FiSend size={18} />
      </SendBtn>
    </Wrapper>
  );
}

export default CreateComment;
