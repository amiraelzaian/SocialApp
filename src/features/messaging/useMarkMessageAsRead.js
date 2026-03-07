import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAsRead as markAsReadApi } from "../../services/apiMessages";
import toast from "react-hot-toast";

export function useMarkMessageAsRead() {
  const queryClient = useQueryClient();

  const { mutate: markMessageAsRead, isPending } = useMutation({
    mutationFn: ({ messageId }) => markAsReadApi(messageId),
    onSuccess: (_, { otherUserId }) => {
      queryClient.invalidateQueries({ queryKey: ["messages", otherUserId] });
      queryClient.invalidateQueries({ queryKey: ["unreadMessagesCount"] });
    },
    onError: () => {
      toast.error("couldn't mark message as read");
    },
  });

  return { markMessageAsRead, isPending };
}
