import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllNotifications as deleteAllNotificationsApi } from "../../services/apiNotifications";
import toast from "react-hot-toast";

export function useDeleteAllNotifications() {
  const queryClient = useQueryClient();
  const { mutate: deleteAllNotifications, isPending } = useMutation({
    mutationFn: () => deleteAllNotificationsApi(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
    onError: () => {
      toast.error("Could not delete notifications");
    },
  });
  return { deleteAllNotifications, isPending };
}
