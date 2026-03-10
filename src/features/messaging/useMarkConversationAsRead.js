import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markConversationAsRead as markConversationAsReadApi } from "../../services/apiMessages";
import toast from "react-hot-toast";

export function useMarkConversationAsRead() {
  const queryClient = useQueryClient();

  const { mutate: markConversationAsRead, isPending } = useMutation({
    mutationFn: ({ otherUserId }) => markConversationAsReadApi(otherUserId),
    onSuccess: (_, { otherUserId }) => {
      queryClient.invalidateQueries({ queryKey: ["messages", otherUserId] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({
        queryKey: ["unreadMessagesCount", otherUserId],
      });
    },
    onError: () => {
      toast.error("couldn't mark conversation as read");
    },
  });

  return { markConversationAsRead, isPending };
}
