// contain cover, avatar and info
import styled from "styled-components";
import ProfileImages from "./ProfileImages";
import UserDetailsCard from "./UserDetailsCard";

const StyledHeader = styled.div`
  width: 100%;
`;

function ProfileHeader() {
  return (
    <StyledHeader>
      <ProfileImages />
      <UserDetailsCard />
    </StyledHeader>
  );
}

export default ProfileHeader;
