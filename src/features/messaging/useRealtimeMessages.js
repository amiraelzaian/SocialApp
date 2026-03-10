import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../services/supabase";
import { useUser } from "../authentication/useUser";

export function useRealtimeMessages(otherUserId) {
  const queryClient = useQueryClient();
  const { user } = useUser(); // ✅ get user synchronously — no async needed

  useEffect(() => {
    if (!user?.id) return;

    // ✅ create channel synchronously — no async/await
    const channel = supabase
      .channel(`messages:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `receiver_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("new message!", payload.new);
          console.log("otherUserId:", otherUserId);
          queryClient.invalidateQueries({
            queryKey: ["messages", otherUserId],
          });
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
          queryClient.invalidateQueries({
            queryKey: ["unreadMessagesCount", otherUserId],
          });
        },
      )
      .subscribe((status) => {
        console.log("status:", status);
      });

    // ✅ cleanup runs synchronously — no dangling subscriptions
    return () => supabase.removeChannel(channel);
  }, [otherUserId, user?.id, queryClient]);
}
