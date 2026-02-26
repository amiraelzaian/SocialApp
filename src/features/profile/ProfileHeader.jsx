// contain cover, avatar and info
import styled from "styled-components";
import ProfileImages from "./ProfileImages";
import UserDetialsCard from "./UserDetialsCard";

const StyledHeader = styled.div`
  width: 100%;
`;

function ProfileHeader() {
  return (
    <StyledHeader>
      <ProfileImages />
      <UserDetialsCard />
    </StyledHeader>
  );
}

export default ProfileHeader;
