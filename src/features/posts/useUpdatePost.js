import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../../services/apiPosts";
import toast from "react-hot-toast";

export function useUpdatePost() {
  const queryClient = useQueryClient();

  const { mutate: editPost, isPending } = useMutation({
    mutationFn: ({ postId, caption, hashtags }) =>
      updatePost(postId, { caption, hashtags }),

    onSuccess: () => {
      toast.success("Post updated successfully! 🎉");
      queryClient.invalidateQueries(["posts"]);
    },

    onError: (error) => {
      toast.error(error.message || "Failed to update post");
    },
  });

  return { editPost, isPending };
}
