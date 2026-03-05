import { useQuery } from "@tanstack/react-query";
import { getFollowers } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useFollowersUsers(userId) {
  const { data: FollowersUsers, isPending } = useQuery({
    queryKey: ["FollowersUsers", userId],
    queryFn: () => getFollowers(userId),
    onSuccess: () => {},
    onError: () => {
      toast.error("could not reload Followers");
    },
    enabled: !!userId,
  });
  return { FollowersUsers, isPending };
}
