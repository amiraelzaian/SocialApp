import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { subscribeToMessages } from "../../services/apiMessages";

export function useRealtimeMessages(otherUserId) {
  const queryClient = useQueryClient();

  useEffect(() => {
    let unsubscribe;

    subscribeToMessages((newMessage) => {
      queryClient.setQueryData(["messages", otherUserId], (old) => [
        ...(old || []),
        newMessage,
      ]);
    }).then((fn) => (unsubscribe = fn));

    return () => unsubscribe?.();
  }, [otherUserId, queryClient]);
}
