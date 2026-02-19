import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost, unlikePost } from "../../services/apiLikes";
import toast from "react-hot-toast";

export function useLike() {
  const queryClient = useQueryClient();

  const { mutate: toggleLike } = useMutation({
    mutationFn: ({ postId, isLiked }) => {
      return isLiked ? unlikePost(postId) : likePost(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      toast.error("It sounds a porblem");
      console.log(error.message);
    },
  });

  return { toggleLike };
}
