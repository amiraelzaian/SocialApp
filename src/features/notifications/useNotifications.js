import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../services/apiNotifications";
import toast from "react-hot-toast";

export function useNotifications() {
  const { data: notifications = [], isPending } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    onError: () => {
      toast.error("Could not reload notifications");
    },
  });
  return { notifications, isPending };
}
