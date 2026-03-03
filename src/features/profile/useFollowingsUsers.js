import { useQuery } from "@tanstack/react-query";
import { getFollowings } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useFollowingsUsers(userId) {
  const { data: FollowingsUsers, isPending } = useQuery({
    queryKey: ["FollowingsUsers", userId],
    queryFn: () => getFollowings(userId),
    onError: () => {
      toast.error("could not reload Followings");
    },
    enabled: !!userId,
  });
  return { FollowingsUsers, isPending };
}
