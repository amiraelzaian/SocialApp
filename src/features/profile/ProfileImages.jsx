import { useUser } from "../authentication/useUser";
import styled from "styled-components";
import Avatar from "../../ui/Avatar";
import { HiArrowLeft, HiCamera, HiPencil } from "react-icons/hi2";
import { useUploadAvatar } from "./useUploadAvatar";
import { useUploadCover } from "./useUploadCover";
import { useUserProfile } from "../discover/useUserProfile";
import { useNavigate, useParams } from "react-router-dom";
import OnlineSign from "../../ui/onlineSign";
import { useUserStatus } from "../presence/useUserStatus";

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

const BackBtn = styled.label`
  position: absolute;
  top: 1rem;
  left: 1rem;
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

//  overflow: visible so OnlineSign is not clipped
const AvatarWrapper = styled.div`
  position: absolute;
  bottom: -30px;
  left: 1rem;
  width: 90px;
  height: 90px;
`;

//  separate inner div handles the circle clip
const AvatarCircle = styled.div`
  width: 90px;
  height: 90px;
  border: 2px solid var(--color-grey-300);
  border-radius: 50%;
  overflow: hidden; /* ← clips avatar only */
  position: relative;
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

  ${AvatarCircle}:hover & {
    opacity: 0.8;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

function ProfileImages() {
  const { id } = useParams();
  const { user } = useUser();

  const isOwnProfile = !id || id === user?.id;

  const { profileUser } = useUserProfile(id);
  const displayUser = isOwnProfile ? user : profileUser;

  const { uploadAvatar, isUploadingAvatar } = useUploadAvatar();
  const { uploadCover, isUploadingCover } = useUploadCover();
  const { userStatus } = useUserStatus(displayUser?.id); //
  const navigate = useNavigate();

  if (!displayUser) return null;

  function handleCoverChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    uploadCover({ userId: user?.id, file });
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    uploadAvatar({ userId: user?.id, file });
  }

  return (
    <Header>
      <Cover src={displayUser.cover_url || "/cover.jpg"} alt="Profile cover" />

      {!isOwnProfile && (
        <BackBtn onClick={() => navigate(-1)}>
          <HiArrowLeft size={20} />
        </BackBtn>
      )}

      {isOwnProfile && (
        <>
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
        </>
      )}

      <AvatarWrapper>
        <AvatarCircle>
          <Avatar
            src={displayUser.avatar_url}
            name={displayUser.full_name}
            alt={displayUser.full_name}
            page="profile"
          />
          {isOwnProfile && (
            <>
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
            </>
          )}
        </AvatarCircle>

        {/* outside AvatarCircle — not clipped */}
        {userStatus?.is_online && <OnlineSign $inProfile={true} />}
      </AvatarWrapper>
    </Header>
  );
}

export default ProfileImages;
