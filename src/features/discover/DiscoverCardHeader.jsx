import styled from "styled-components";

const Cover = styled.div`
  width: 100%;
  height: 90px;
  border-radius: 8px 8px 0 0;
  background-image: ${({ $cover }) =>
    $cover ? `url(${$cover})` : "linear-gradient(135deg, #667eea, #764ba2)"};
  background-size: cover;
  background-position: center;
  position: relative;
`;

const AvatarWrapper = styled.div`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
`;

const Avatar = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  border: 3px solid var(--color-grey-0);
  background-color: ${({ $color }) => $color || "#e91e8c"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
  overflow: hidden;
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const COLORS = [
  "#e91e8c",
  "#9c27b0",
  "#2196f3",
  "#00bcd4",
  "#4caf50",
  "#ff5722",
  "#ff9800",
  "#3f51b5",
];

function getColor(name = "") {
  const index = name.charCodeAt(0) % COLORS.length;
  return COLORS[index];
}

function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function DiscoverCardHeader({ data }) {
  const color = getColor(data?.full_name);
  const initials = getInitials(data?.full_name);

  return (
    <Cover $cover={data?.cover_url}>
      <AvatarWrapper>
        <Avatar $color={color}>
          {data?.avatar_url ? (
            <AvatarImg src={data.avatar_url} alt={data.full_name} />
          ) : (
            initials
          )}
        </Avatar>
      </AvatarWrapper>
    </Cover>
  );
}

export default DiscoverCardHeader;
