import { useQuery } from "@tanstack/react-query";
import { getUnreadCount } from "../../services/apiNotifications";
import toast from "react-hot-toast";

export function useUnreadCount() {
  const { data: unreadCount = 0, isPending } = useQuery({
    queryKey: ["unreadCount"],
    queryFn: getUnreadCount,
    onError: () => {
      toast.error("Could not reload notifications count");
    },
  });
  return { unreadCount, isPending };
}
