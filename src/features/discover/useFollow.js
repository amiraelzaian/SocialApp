import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { followUser, unfollowUser, isFollowing } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useFollow(userId) {
  const queryClient = useQueryClient();

  const { data: isFollowingUser = false } = useQuery({
    queryKey: ["following", userId],
    queryFn: () => isFollowing(userId),
    enabled: !!userId,
  });

  const { mutate: toggleFollow, isPending } = useMutation({
    mutationFn: () =>
      isFollowingUser ? unfollowUser(userId) : followUser(userId),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["following", userId] });

      const previousIsFollowing = queryClient.getQueryData([
        "following",
        userId,
      ]);
      const currentIsFollowing = previousIsFollowing ?? false;

      // ✅ only update the button state, don't touch suggestedUsers
      queryClient.setQueryData(["following", userId], !currentIsFollowing);

      return { previousIsFollowing };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ["following", userId],
        context.previousIsFollowing,
      );
      toast.error("Could not update follow status");
    },

    onSettled: () => {
      // ✅ only invalidate the follow status, not the list
      queryClient.invalidateQueries({ queryKey: ["following", userId] });
    },
  });

  return { toggleFollow, isFollowingUser, isPending };
}
