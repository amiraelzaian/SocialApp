import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessage as deleteMessageApi } from "../../services/apiMessages";
import toast from "react-hot-toast";

export function useDeleteMessage() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteMessage,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ messageId }) => deleteMessageApi(messageId),
    onSuccess: (_, { otherUserId }) => {
      queryClient.invalidateQueries({ queryKey: ["messages", otherUserId] });
    },
    onError: () => {
      toast.error("couldn't delete this message");
    },
  });

  return { deleteMessage, isPending, error };
}
