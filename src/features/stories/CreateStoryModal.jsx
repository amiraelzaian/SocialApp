import { useState } from "react";
import { useScreen } from "../../context/ScreenSizeContext";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

import {
  ButtonGroup,
  FieldGroup,
  FieldLabel,
  Form,
  Textarea,
  Title,
} from "../../ui/PostModal";
import ImageUploader from "../posts/ImageUploader";
import { useCreateStory } from "./useCreateStory";

function CreateStoryModal({ onClose }) {
  const { isMobile } = useScreen();
  const { createStory, isPending } = useCreateStory();
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!imageUrl) return;
    createStory({ imageUrl, caption }, { onSuccess: onClose });
    setImageUrl("");
    setCaption("");
  }

  return (
    <Modal onClose={onClose}>
      <Title $isMobile={isMobile}>Create story</Title>
      <Form onSubmit={handleSubmit} $isMobile={isMobile}>
        <ImageUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />{" "}
        <FieldGroup>
          <FieldLabel>Caption</FieldLabel>
          <Textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            disabled={isPending}
            $isMobile={isMobile}
          />
        </FieldGroup>
        <ButtonGroup $isMobile={isMobile}>
          <Button
            type="button"
            $variation="secondary"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending || !imageUrl}>
            {isPending ? "Posting..." : "Add Story"}
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
}
export default CreateStoryModal;
