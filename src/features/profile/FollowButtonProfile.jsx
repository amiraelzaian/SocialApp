import { HiMiniUserMinus, HiMiniUserPlus } from "react-icons/hi2";
import { useFollow } from "../discover/useFollow";
import { EditButton } from "./UserDetailsCard";
function FollowButtonProfile({ userId }) {
  const { toggleFollow, isFollowingUser, isPending } = useFollow(userId);

  return (
    <EditButton onClick={toggleFollow} disabled={isPending}>
      {isFollowingUser ? (
        <>
          <HiMiniUserMinus /> Following
        </>
      ) : (
        <>
          <HiMiniUserPlus /> Follow
        </>
      )}
    </EditButton>
  );
}

export default FollowButtonProfile;
