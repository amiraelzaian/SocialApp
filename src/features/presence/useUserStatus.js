import { useQuery } from "@tanstack/react-query";
import { getUserStatus } from "../../services/apiPresence";

export function useUserStatus(userId) {
  const { data: userStatus, isPending } = useQuery({
    queryKey: ["userStatus", userId],
    queryFn: () => getUserStatus(userId),
    enabled: !!userId,
    refetchInterval: 30000,
  });

  return { userStatus, isPending };
}
