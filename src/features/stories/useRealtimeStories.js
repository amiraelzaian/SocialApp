import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../services/supabase";

export function useRealtimeStories() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("realtime-stories")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "stories" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["stories"] });
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [queryClient]);
}
