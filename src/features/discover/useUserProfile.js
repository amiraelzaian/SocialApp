import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/apiUsers";

export function useUserProfile(userId) {
  const { data: profileUser, isPending } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
  });

  return { profileUser, isPending };
}
