import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications } from "../../services/apiNotifications";
import { useEffect } from "react";
import { supabase } from "../../services/supabase";
import toast from "react-hot-toast";

export function useNotifications() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("notifications-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["notifications"] });
          queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [queryClient]);

  const { data: notifications = [], isPending } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    onError: () => {
      toast.error("Could not reload notifications");
    },
  });

  return { notifications, isPending };
}
