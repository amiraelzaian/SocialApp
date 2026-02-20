import { useState } from "react";
import styled from "styled-components";
import { HiOutlinePhotograph, HiX } from "react-icons/hi";
import { uploadPostImage } from "../../services/apiStorage";
import { useUser } from "../authentication/useUser";
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
    background-color: var(--color-brand-50);
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

  svg {
    font-size: 2rem;
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  const [preview, setPreview] = useState(imageUrl || null);
  const { user } = useUser();

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be less than 10MB");
      return;
    }

    try {
      setIsUploading(true);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase Storage
      const postId = crypto.randomUUID(); // Generate temporary ID
      const publicUrl = await uploadPostImage(user.id, postId, file);

      setImageUrl(publicUrl);
      toast.success("Image uploaded successfully! 🎉");
    } catch (error) {
      toast.error(error.message);
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setImageUrl("");
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
