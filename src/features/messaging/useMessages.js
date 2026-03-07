import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../services/apiMessages";
import toast from "react-hot-toast";

export function useMessages(otherUserId) {
  const {
    data: messages,
    isPending,
    error,
  } = useQuery({
    queryKey: ["messages", otherUserId],
    queryFn: () => getMessages(otherUserId),
    onError: () => toast.error("Could not load chat"),
  });

  return { messages, isPending, error };
}
