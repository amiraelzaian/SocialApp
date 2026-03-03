import { useQuery } from "@tanstack/react-query";
import { isFollowing } from "../../services/apiUsers";

export function useIsFollowings(targetUserId) {
  const { data: isFollowingUser, isPending } = useQuery({
    queryKey: ["isFollowing", targetUserId],
    queryFn: () => isFollowing(targetUserId),
    enabled: !!targetUserId,
  });

  return { isFollowingUser, isPending };
}
