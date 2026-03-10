import ProfileHeader from "../features/profile/ProfileHeader";
import UserPosts from "../features/profile/UserPosts";
import CreatePost from "../features/posts/CreatePost";
import { useUser } from "../features/authentication/useUser";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledDiv = styled.div`
  padding-bottom: 50px;
`;

function Profile() {
  const { user } = useUser();
  const { id } = useParams();
  const isOwnProfile = !id || id === user?.id;
  return (
    <StyledDiv>
      <ProfileHeader />
      {isOwnProfile && <CreatePost />}
      <UserPosts />
    </StyledDiv>
  );
}

export default Profile;
