// useLike.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { likePost, unlikePost, isPostLiked } from "../../services/apiLikes";
import toast from "react-hot-toast";

export function useLike(postId) {
  const queryClient = useQueryClient();

  // Fetch real liked status from Supabase on mount
  const { data: isLiked = false } = useQuery({
    queryKey: ["liked", postId],
    queryFn: () => isPostLiked(postId),
  });

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => (isLiked ? unlikePost(postId) : likePost(postId)),

    onSuccess: () => {
      // update the liked status cache directly
      queryClient.setQueryData(["liked", postId], !isLiked);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return { toggleLike, isLiked };
}
