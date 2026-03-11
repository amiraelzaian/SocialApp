import { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Button from "./Button";
import ImageUploader from "../features/posts/ImageUploader";
import { useCreatePost } from "../features/posts/useCreatePost";
import { useUpdatePost } from "../features/posts/useUpdatePost";
import { useScreen } from "../context/ScreenSizeContext";
import toast from "react-hot-toast";
import Input from "./Input";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: ${({ $isMobile }) =>
    $isMobile ? "1.6rem 1.2rem" : "2rem 2.4rem 2.4rem"};
`;

export const Title = styled.h2`
  font-size: ${({ $isMobile }) => ($isMobile ? "1.8rem" : "2rem")};
  font-weight: 700;
  color: var(--color-grey-800);
  text-align: center;
  padding: ${({ $isMobile }) =>
    $isMobile ? "1.6rem 1.2rem 1.2rem" : "2rem 2.4rem 1.6rem"};
  border-bottom: 1px solid var(--color-grey-200);
  letter-spacing: -0.02em;
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: ${({ $isMobile }) => ($isMobile ? "9rem" : "12rem")};
  padding: 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-md);
  font-family: inherit;
  font-size: 1.5rem;
  resize: vertical;
  color: var(--color-grey-800);
  background: var(--color-grey-0);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  line-height: 1.6;

  &::placeholder {
    color: var(--color-grey-400);
  }

  &:focus {
    outline: none;
    border-color: var(--color-brand-500);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--color-brand-500) 15%, transparent);
  }

  &:disabled {
    background-color: var(--color-grey-100);
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const FieldLabel = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;
  display: block;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: ${({ $isMobile }) => ($isMobile ? "stretch" : "flex-end")};
  padding-top: 1.6rem;
  border-top: 1px solid var(--color-grey-200);

  ${({ $isMobile }) => $isMobile && `& > * { flex: 1; }`}
`;

function PostModal({ mode = "create", post = null, onClose }) {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [hashtagsInput, setHashtagsInput] = useState("");

  const { createNewPost, isPending: isCreating } = useCreatePost();
  const { editPost, isUpdating } = useUpdatePost();
  const { isMobile } = useScreen();

  const isEditMode = mode === "edit";
  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (isEditMode && post) {
      setImageUrl(post.image_url || "");
      setCaption(post.caption || "");
      setHashtagsInput(post.hashtags?.join(" ") || "");
    }
  }, [isEditMode, post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const hashtags = hashtagsInput
      .split(/\s+/)
      .filter((tag) => tag.startsWith("#"))
      .map((tag) => tag.replace("#", ""));

    if (isEditMode) {
      editPost(
        { postId: post.id, caption, hashtags },
        { onSuccess: () => onClose() },
      );
    } else {
      if (!imageUrl) {
        toast.error("Please upload an image");
        return;
      }
      createNewPost(
        { caption, imageUrl, hashtags },
        { onSuccess: () => onClose() },
      );
    }
  };

  return (
    <Modal onClose={onClose}>
      <Title $isMobile={isMobile}>
        {isEditMode ? "Edit Post" : "Create New Post"}
      </Title>
      <Form onSubmit={handleSubmit} $isMobile={isMobile}>
        {!isEditMode && (
          <ImageUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
        )}

        <FieldGroup>
          <FieldLabel>Caption</FieldLabel>
          <Textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            disabled={isLoading}
            $isMobile={isMobile}
          />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Hashtags</FieldLabel>
          <Input
            type="text"
            value={hashtagsInput}
            onChange={(e) => setHashtagsInput(e.target.value)}
            placeholder="#hashtag1 #hashtag2 #hashtag3"
            disabled={isLoading}
          />
        </FieldGroup>

        <ButtonGroup $isMobile={isMobile}>
          <Button
            type="button"
            $variation="secondary"
            $onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "..." : isEditMode ? "Update" : "Post"}
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
}

export default PostModal;
