import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "../../services/apiComments";
import toast from "react-hot-toast";

export function useUpdateComment(postId) {
  const queryClient = useQueryClient();

  const { mutate: editComment, isPending: isUpdating } = useMutation({
    mutationFn: ({ commentId, content }) => updateComment(commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: () => {
      toast.error("Couldn't update comment");
    },
  });

  return { editComment, isUpdating };
}
