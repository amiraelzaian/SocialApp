import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../services/apiComments";
import toast from "react-hot-toast";

export function useDeleteComment(postId) {
  const queryClient = useQueryClient();

  const { mutate: removeComment, isPending: isDeleting } = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: () => {
      toast.error("Couldn't delete comment");
    },
  });

  return { removeComment, isDeleting };
}
