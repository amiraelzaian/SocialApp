import { useUser } from "../authentication/useUser";
import styled from "styled-components";
import Avatar from "../../ui/Avatar";
import { HiCamera, HiPencil } from "react-icons/hi2";
import { useUploadAvatar } from "./useUploadAvatar";
import { useUploadCover } from "./useUploadCover";

const Header = styled.header`
  width: 100%;
  height: 300px;
  position: relative;
`;

const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CoverUploadBtn = styled.label`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--color-grey-600);
  color: var(--color-grey-50);
  border-radius: 8px;
  padding: 0.5rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: var(--color-grey-800);
  }
`;

const AvatarPart = styled.div`
  width: 90px;
  height: 90px;
  border: 2px solid var(--color-grey-300);
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  bottom: -30px;
  left: 1rem;
`;

const AvatarOverlay = styled.label`
  position: absolute;
  inset: 0;
  background: var(--color-grey-700);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-grey-50);
  font-size: 1.4rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;

  ${AvatarPart}:hover & {
    opacity: 0.8;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

function ProfileImages() {
  const { user } = useUser();
  const { uploadAvatar, isUploadingAvatar } = useUploadAvatar();
  const { uploadCover, isUploadingCover } = useUploadCover();

  if (!user) return null;

  function handleCoverChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const userId = user?.id;
    uploadCover({ userId, file });
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const userId = user?.id;
    uploadAvatar({ userId, file });
  }

  return (
    <Header>
      <Cover src={user.cover_url || "/public/cover.jpg"} alt="Profile cover" />

      <CoverUploadBtn htmlFor="cover-upload">
        <HiCamera size={18} />
        Edit cover
      </CoverUploadBtn>
      <HiddenInput
        id="cover-upload"
        type="file"
        accept="image/*"
        onChange={handleCoverChange}
        disabled={isUploadingCover}
      />

      <AvatarPart>
        <Avatar
          src={user.avatar_url}
          name={user.full_name}
          alt={user.full_name}
          page="profile"
        />
        <AvatarOverlay htmlFor="avatar-upload">
          <HiPencil />
        </AvatarOverlay>
        <HiddenInput
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          disabled={isUploadingAvatar}
        />
      </AvatarPart>
    </Header>
  );
}

export default ProfileImages;
