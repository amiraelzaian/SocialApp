import ProfileHeader from "../features/profile/ProfileHeader";
import UserPosts from "../features/profile/UserPosts";
import CreatePost from "../features/posts/CreatePost";
import { useUser } from "../features/authentication/useUser";
import { useParams } from "react-router-dom";

function Profile() {
  const { user } = useUser();
  const { id } = useParams();
  const isOwnProfile = !id || id === user?.id;
  return (
    <div>
      <ProfileHeader />
      {isOwnProfile && <CreatePost />}
      <UserPosts />
    </div>
  );
}

export default Profile;
