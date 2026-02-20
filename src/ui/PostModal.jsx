import { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Button from "./Button";
import ImageUploader from "../features/posts/ImageUploader";
import { useCreatePost } from "../features/posts/useCreatePost";
import { useUpdatePost } from "../features/posts/useUpdatePost";
import toast from "react-hot-toast";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  min-width: 56rem;
  max-width: 60rem;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--color-grey-800);
  text-align: center;
  padding-bottom: 1.6rem;
  border-bottom: 1px solid var(--color-grey-200);
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 12rem;
  padding: 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-md);
  font-family: inherit;
  font-size: 1.5rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
  }

  &:disabled {
    background-color: var(--color-grey-200);
    cursor: not-allowed;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-md);
  font-family: inherit;
  font-size: 1.4rem;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
  }

  &:disabled {
    background-color: var(--color-grey-200);
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
  padding-top: 1.6rem;
  border-top: 1px solid var(--color-grey-200);
`;

function PostModal({ mode = "create", post = null, onClose }) {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // ✅ Fixed: was 'image', now 'imageUrl'
  const [hashtagsInput, setHashtagsInput] = useState(""); // ✅ Fixed: added hashtags input

  const { createNewPost, isPending: isCreating } = useCreatePost();
  const { editPost, isUpdating } = useUpdatePost();

  const isEditMode = mode === "edit";
  const isLoading = isCreating || isUpdating;

  // ✅ Fixed: Pre-fill form in edit mode
  useEffect(() => {
    if (isEditMode && post) {
      setCaption(post.caption || "");
      setImageUrl(post.image_url || "");
      setHashtagsInput(post.hashtags?.join(" ") || "");
    }
  }, [isEditMode, post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Fixed: Parse hashtags from input
    const hashtags = hashtagsInput
      .split(/\s+/)
      .filter((tag) => tag.startsWith("#"))
      .map((tag) => tag.replace("#", ""));

    if (isEditMode) {
      // ✅ Edit mode
      editPost(
        { postId: post.id, caption, hashtags },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    } else {
      // ✅ Create mode - validate image
      if (!imageUrl) {
        toast.error("Please upload an image");
        return;
      }

      createNewPost(
        { caption, imageUrl, hashtags },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    }
  };

  return (
    <Modal onClose={onClose}>
      <Title>{isEditMode ? "Edit Post" : "Create New Post"}</Title>

      <Form onSubmit={handleSubmit}>
        {/* ✅ Image upload - only in create mode, pass props */}
        {!isEditMode && (
          <ImageUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
        )}

        {/* ✅ Caption textarea */}
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          disabled={isLoading}
        />

        {/* ✅ Hashtags input */}
        <Input
          type="text"
          value={hashtagsInput}
          onChange={(e) => setHashtagsInput(e.target.value)}
          placeholder="#hashtag1 #hashtag2 #hashtag3"
          disabled={isLoading}
        />

        {/* ✅ Buttons */}
        <ButtonGroup>
          <Button
            type="button"
            variation="secondary"
            onClick={onClose}
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
