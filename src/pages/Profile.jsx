import ProfileHeader from "../features/profile/ProfileHeader";
import UserPosts from "../features/profile/UserPosts";
import CreatePost from "../features/posts/CreatePost";

function Profile() {
  return (
    <div>
      <ProfileHeader />
      <CreatePost />
      <UserPosts />
    </div>
  );
}

export default Profile;
