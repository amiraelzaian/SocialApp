import styled from "styled-components";
import { HiCog6Tooth, HiMapPin, HiLink, HiCalendarDays } from "react-icons/hi2";
import { useUser } from "../authentication/useUser";
import { Link } from "react-router-dom";
import { useFollowersCount } from "./useFollowersCount";
import { useFollowingsCount } from "./useFollowingsCount";
import { useUserPosts } from "./useUserPosts";
import { useState } from "react";
import UpdateUserModal from "./UpdateUserModal";

const StyledUserInfoCard = styled.div`
  width: 95%;
  height: fit-content;
  background-color: var(--color-grey-50);
  padding: 20px;
  margin: 0 auto 10px;
  border: 2px solid var(--color-grey-200);
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 15px;
`;

const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const FullName = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: var(--color-grey-800);
  margin: 0;
`;

const Username = styled.span`
  font-size: 16px;
  color: var(--color-grey-500);
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1.5px solid var(--color-grey-300);
  border-radius: 20px;
  background: transparent;
  color: var(--color-grey-700);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Bio = styled.p`
  font-size: 14px;
  color: var(--color-grey-700);
  line-height: 1.5;
  margin: 0;
`;

const InfoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: var(--color-grey-500);

  svg {
    color: var(--color-brand-600);
    flex-shrink: 0;
  }
`;

const InfoLink = styled.a`
  color: var(--color-brand-600);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 24px;
  padding-top: 8px;
  border-top: 1px solid var(--color-grey-200);
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: var(--color-grey-600);
  cursor: pointer;

  &:hover span:first-child {
    text-decoration: underline;
  }
`;

const StatCount = styled.span`
  font-weight: 700;
  color: var(--color-grey-800);
`;

function UserDetailsCard() {
  const { user } = useUser();
  const { followersCount } = useFollowersCount(user.id);
  const { followingsCount } = useFollowingsCount(user.id);
  const { userPosts } = useUserPosts(user.id);
  const [close, setClose] = useState();

  if (!user) return null;

  const joinedDate = new Date(user.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <StyledUserInfoCard>
        <Header>
          <MainInfo>
            <FullName>{user.full_name}</FullName>
            <Username>@{user.username}</Username>
          </MainInfo>
          <Actions>
            <EditButton onClick={() => setClose((close) => !close)}>
              <HiCog6Tooth size={14} />
              Edit Profile
            </EditButton>
          </Actions>
        </Header>

        {user.bio && <Bio>{user.bio}</Bio>}

        <InfoList>
          {user.location && (
            <InfoItem>
              <HiMapPin size={15} />
              {user.location}
            </InfoItem>
          )}
          {user.website && (
            <InfoItem>
              <HiLink size={15} />
              <InfoLink href={user.website} target="_blank" rel="noreferrer">
                {user.website.replace(/^https?:\/\//, "")}
              </InfoLink>
            </InfoItem>
          )}
          <InfoItem>
            <HiCalendarDays size={15} />
            Joined {joinedDate}
          </InfoItem>
        </InfoList>

        <Stats>
          <StatItem>
            <StatCount>{userPosts.length || 0}</StatCount>
            <span>Posts</span>
          </StatItem>
          <StatItem>
            <StatCount>{followersCount}</StatCount>
            <span>Followers</span>
          </StatItem>
          <StatItem>
            <StatCount>{followingsCount}</StatCount>
            <span>Following</span>
          </StatItem>
        </Stats>
      </StyledUserInfoCard>
      {close && <UpdateUserModal onClose={() => setClose((close) => !close)} />}
    </>
  );
}

export default UserDetailsCard;
