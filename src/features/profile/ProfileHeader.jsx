// contain cover, avatar and info
import styled from "styled-components";
import ProfileImages from "./ProfileImages";

const StyledHeader = styled.div`
  width: 100%;
`;

function ProfileHeader() {
  return (
    <StyledHeader>
      <ProfileImages />
    </StyledHeader>
  );
}

export default ProfileHeader;
