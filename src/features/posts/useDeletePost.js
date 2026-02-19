import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../services/apiPosts";
import toast from "react-hot-toast";

export function useDeletePost() {
  const queryClient = useQueryClient();

  const { mutate: removePost, isPending } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { removePost, isPending };
}
