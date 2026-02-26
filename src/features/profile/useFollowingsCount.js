import { useQuery } from "@tanstack/react-query";
import { getFollowingCount } from "../../services/apiUsers";

export function useFollowingsCount(userId) {
  const { data: followingsCount, isPending: isGettingFollowingCount } =
    useQuery({
      queryKey: ["followingCount", userId],
      queryFn: () => getFollowingCount(userId),
      enabled: !!userId,
    });

  return { followingsCount, isGettingFollowingCount };
}
