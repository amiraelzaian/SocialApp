// useRealtimeMessages.js
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../services/supabase";
import { useUser } from "../authentication/useUser";

export function useRealtimeMessages() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;

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
        () => {
          queryClient.invalidateQueries({ queryKey: ["messages"] });
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
          queryClient.invalidateQueries({ queryKey: ["unreadMessagesCount"] });
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [user?.id, queryClient]);
}
