import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { followUser, unfollowUser, isFollowing } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useFollow(targetUserId) {
  const queryClient = useQueryClient();

  const { data: isFollowingUser = false } = useQuery({
    queryKey: ["isFollowing", targetUserId],
    queryFn: () => isFollowing(targetUserId),
    enabled: !!targetUserId,
  });

  const { mutate: toggleFollow, isPending } = useMutation({
    mutationFn: () =>
      isFollowingUser ? unfollowUser(targetUserId) : followUser(targetUserId),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["isFollowing", targetUserId],
      });
      const previous = queryClient.getQueryData(["isFollowing", targetUserId]);
      queryClient.setQueryData(["isFollowing", targetUserId], !isFollowingUser);
      return { previous };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(["isFollowing", targetUserId], context.previous);
      toast.error("Could not update follow status");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["isFollowing", targetUserId],
      });
      queryClient.invalidateQueries({
        queryKey: ["followersCount", targetUserId],
      });
      queryClient.invalidateQueries({
        queryKey: ["followingCount", targetUserId],
      });
    },
  });

  return { toggleFollow, isFollowingUser, isPending };
}
