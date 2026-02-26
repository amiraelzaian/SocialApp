import { useQuery } from "@tanstack/react-query";
import { getFollowerCount } from "../../services/apiUsers";

export function useFollowersCount(userId) {
  const { data: followersCount, isPending: isGettingFollowersCount } = useQuery(
    {
      queryKey: ["followersCount", userId],
      queryFn: () => getFollowerCount(userId),
      enabled: !!userId,
    },
  );

  return { followersCount, isGettingFollowersCount };
}
