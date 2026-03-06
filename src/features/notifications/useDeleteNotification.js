import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotification as deleteNotificationApi } from "../../services/apiNotifications";
import toast from "react-hot-toast";

export function useDeleteNotification() {
  const queryClient = useQueryClient();
  const { mutate: deleteNotification, isPending } = useMutation({
    mutationFn: (notificationId) => deleteNotificationApi(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("Could not mark notification as read");
    },
  });
  return { deleteNotification, isPending };
}
