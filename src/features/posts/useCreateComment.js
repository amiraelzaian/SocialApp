import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../services/apiComments";
import toast from "react-hot-toast";

export function useCreateComment(postId) {
  const queryClient = useQueryClient();

  const { mutate: addComment, isPending: isCreating } = useMutation({
    mutationFn: ({ postId, content }) => createComment(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: () => {
      toast.error("Couldn't post comment");
    },
  });

  return { addComment, isCreating };
}
