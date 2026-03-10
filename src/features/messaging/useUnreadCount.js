import { useQuery } from "@tanstack/react-query";
import { getUnreadCount } from "../../services/apiMessages";
import toast from "react-hot-toast";

export function useUnreadMessagesCount() {
  const {
    data: unreadMessagesCount,
    isPending,
    error,
  } = useQuery({
    queryKey: ["unreadMessagesCount"],
    queryFn: getUnreadCount,
  });

  if (error) toast.error("couldn't get unread messages count");

  return { unreadMessagesCount, isPending };
}
