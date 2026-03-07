import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteConversation as deleteConversationApi } from "../../services/apiMessages";
import toast from "react-hot-toast";

export function useDeleteConversation(otherUserId) {
  const queryClient = useQueryClient();

  const {
    mutate: deleteConversation,
    error,
    isPending: isDeleting,
  } = useMutation({
    mutationFn: () => deleteConversationApi(otherUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", otherUserId] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError: () => {
      toast.error("couldn't delete conversation");
    },
  });

  return { deleteConversation, error, isDeleting };
}
