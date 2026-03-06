import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAllAsRead as markAllAsReadApi } from "../../services/apiNotifications";
import toast from "react-hot-toast";

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();
  const { mutate: markAllAsRead, isPending } = useMutation({
    mutationFn: () => markAllAsReadApi(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("Could not mark all as read");
    },
  });
  return { markAllAsRead, isPending };
}
