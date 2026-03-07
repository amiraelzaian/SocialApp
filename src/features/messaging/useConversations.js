import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../../services/apiMessages";
import toast from "react-hot-toast";

export function useConversations() {
  const { data: conversations, isPending } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
    error: () => {
      toast.error("couldn't reload conversations");
    },
  });

  return { conversations, isPending };
}
