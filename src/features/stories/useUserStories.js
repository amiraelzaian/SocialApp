import { useQuery } from "@tanstack/react-query";
import { getUserStories } from "../../services/apiStories";

export function useUserStories(userId) {
  const {
    data: userStories,
    isPending,
    error,
  } = useQuery({
    queryKey: ["stories", userId],
    queryFn: () => getUserStories(userId),
    enabled: !!userId,
  });

  return { userStories, isPending, error };
}
