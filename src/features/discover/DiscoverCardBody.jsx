import styled from "styled-components";
import { formatCount } from "../../utils/helpers";
import { useFollowersCount } from "../profile/useFollowersCount";
import { useFollowingsCount } from "../profile/useFollowingsCount";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 38px 12px 12px;
  gap: 4px;
`;

const FullName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-grey-800);
  margin: 0;
`;

const Username = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-500);
`;

const Bio = styled.p`
  font-size: 1.3rem;
  color: var(--color-grey-600);
  text-align: center;
  margin: 4px 0 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Stats = styled.div`
  display: flex;
  gap: 2.4rem;
  margin-top: 10px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const StatNumber = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-grey-800);
`;

const StatLabel = styled.span`
  font-size: 1.1rem;
  color: var(--color-grey-500);
`;

function DiscoverCardBody({ data }) {
  const { followersCount } = useFollowersCount(data.id);
  const { followingsCount } = useFollowingsCount(data.id);
  return (
    <Wrapper>
      <FullName>{data?.full_name || "Unknown"}</FullName>
      <Username>@{data?.username || "unknown"}</Username>
      {data?.bio && <Bio>{data.bio} </Bio>}
      <Stats>
        <Stat>
          <StatNumber>{formatCount(followersCount)}</StatNumber>
          <StatLabel>Followers</StatLabel>
        </Stat>
        <Stat>
          <StatNumber>{formatCount(followingsCount)}</StatNumber>
          <StatLabel>Following</StatLabel>
        </Stat>
      </Stats>
    </Wrapper>
  );
}

export default DiscoverCardBody;
