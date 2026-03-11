import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { HiOutlinePhotograph, HiX } from "react-icons/hi";
import { uploadPostImage } from "../../services/apiStorage";
import { useUser } from "../authentication/useUser";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const Container = styled.div`
  width: 100%;
`;

const UploadArea = styled.div`
  width: 100%;
  min-height: 30rem;
  border: 2px dashed var(--color-grey-300);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  cursor: pointer;
  transition: all 0.3s;
  background-color: var(--color-grey-50);

  &:hover {
    border-color: var(--color-brand-600);
    background-color: var(--color-brand-500);
  }
`;

const Icon = styled.div`
  font-size: 6rem;
  color: var(--color-grey-400);
`;

const Text = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-600);
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const PreviewImage = styled.img`
  width: 100%;
  max-height: 50rem;
  object-fit: cover;
  display: block;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 3.6rem;
  height: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }

  svg {
    font-size: 2rem;
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.6rem;
  font-weight: 600;
`;

function ImageUploader({ imageUrl, setImageUrl }) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const { user } = useUser();
  const fileInputRef = useRef(null);

  // Sync preview when parent imageUrl changes
  useEffect(() => {
    setPreview(imageUrl || null);
  }, [imageUrl]);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!user?.id) {
      toast.error("You must be logged in to upload an image");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be less than 10MB");
      return;
    }

    try {
      setIsUploading(true);

      // Instant preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      //  Fixed UUID generation
      const postId = uuidv4();

      const publicUrl = await uploadPostImage(user.id, postId, file);

      setImageUrl(publicUrl);
      toast.success("Image uploaded successfully! 🎉");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload image");
      setPreview(null);
      setImageUrl("");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setImageUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Container>
      {!preview ? (
        <label>
          <UploadArea>
            <Icon>
              <HiOutlinePhotograph />
            </Icon>
            <Text>Click to upload an image</Text>
            <Text
              style={{ fontSize: "1.4rem", color: "var(--color-grey-500)" }}
            >
              PNG, JPG up to 10MB
            </Text>
          </UploadArea>
          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
          />
        </label>
      ) : (
        <PreviewContainer>
          <PreviewImage src={preview} alt="Upload preview" />

          {isUploading && <LoadingOverlay>Uploading...</LoadingOverlay>}

          {!isUploading && (
            <RemoveButton onClick={handleRemove}>
              <HiX />
            </RemoveButton>
          )}
        </PreviewContainer>
      )}
    </Container>
  );
}

export default ImageUploader;
