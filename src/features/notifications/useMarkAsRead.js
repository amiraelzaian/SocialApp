import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAsRead as markAsReadApi } from "../../services/apiNotifications";
import toast from "react-hot-toast";

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  const { mutate: markAsRead, isPending } = useMutation({
    mutationFn: (notificationId) => markAsReadApi(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
    onError: () => {
      toast.error("Could not mark notification as read");
    },
  });

  return { markAsRead, isPending };
}
