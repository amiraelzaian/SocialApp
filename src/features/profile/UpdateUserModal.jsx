import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useUpdateUserDetails } from "./useUpdateUserDetails";
import { useScreen } from "../../context/ScreenSizeContext";
import { useUser } from "../authentication/useUser";
import { useState } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: ${({ $isMobile }) =>
    $isMobile ? "1.6rem 1.2rem" : "2rem 2.4rem 2.4rem"};
`;

const Title = styled.h2`
  font-size: ${({ $isMobile }) => ($isMobile ? "1.8rem" : "2rem")};
  font-weight: 700;
  color: var(--color-grey-800);
  text-align: center;
  padding: ${({ $isMobile }) =>
    $isMobile ? "1.6rem 1.2rem 1.2rem" : "2rem 2.4rem 1.6rem"};
  border-bottom: 1px solid var(--color-grey-200);
  letter-spacing: -0.02em;
`;

const Textarea = styled.textarea`
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

const Input = styled.input`
  width: 100%;
  padding: 1.1rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-md);
  font-family: inherit;
  font-size: 1.4rem;
  color: var(--color-grey-800);
  background: var(--color-grey-0);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

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

const FieldLabel = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;
  display: block;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: ${({ $isMobile }) => ($isMobile ? "stretch" : "flex-end")};
  padding-top: 1.6rem;
  border-top: 1px solid var(--color-grey-200);

  ${({ $isMobile }) => $isMobile && `& > * { flex: 1; }`}
`;

function UpdateUserModal({ onClose }) {
  const { updateProfile, isUpdating } = useUpdateUserDetails(onClose);
  const { isMobile } = useScreen();
  const { user } = useUser();

  const [fullName, setFullName] = useState(user.full_name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [location, setLocation] = useState(user.location || "");
  const [website, setWebsite] = useState(user.website || "");

  function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;
    updateProfile({ fullName, bio, location, website });
  }

  return (
    <Modal onClose={onClose}>
      <Title $isMobile={isMobile}>Update Profile</Title>
      <Form onSubmit={handleSubmit} $isMobile={isMobile}>
        <FieldGroup>
          <FieldLabel>Full Name</FieldLabel>
          <Input
            type="text"
            defaultValue={user.full_name}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name..."
            disabled={isUpdating}
          />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Bio</FieldLabel>
          <Textarea
            value={bio}
            defaultValue={user.bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
            disabled={isUpdating}
            $isMobile={isMobile}
          />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Location</FieldLabel>
          <Input
            type="text"
            value={location}
            defaultValue={user.location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where are you based?"
            disabled={isUpdating}
          />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Website</FieldLabel>
          <Input
            type="text"
            value={website}
            defaultValue={user.website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://yourwebsite.com"
            disabled={isUpdating}
          />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Joined</FieldLabel>
          <Input
            type="text"
            value={new Date(user.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            disabled={true}
          />
        </FieldGroup>

        <ButtonGroup $isMobile={isMobile}>
          <Button
            type="button"
            $variation="secondary"
            onClick={onClose}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? "..." : "Update"}
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
}

export default UpdateUserModal;
