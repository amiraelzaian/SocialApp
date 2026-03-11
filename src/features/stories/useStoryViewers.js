import { useQuery } from "@tanstack/react-query";
import { getStoryViewers } from "../../services/apiStories";

export function useStoryViewers(storyId) {
  const {
    data: viewers,
    isPending,
    error,
  } = useQuery({
    queryKey: ["storyViewers", storyId],
    queryFn: () => getStoryViewers(storyId),
    enabled: !!storyId,
  });

  return { viewers, isPending, error };
}
