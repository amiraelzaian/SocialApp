import { useMutation, useQueryClient } from "@tanstack/react-query";
import { viewStory as viewStoryApi } from "../../services/apiStories";

export function useViewStory() {
  const queryClient = useQueryClient();

  const { mutate: viewStory } = useMutation({
    mutationFn: (storyId) => viewStoryApi(storyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      queryClient.invalidateQueries({ queryKey: ["unviewedStoriesCount"] });
    },
  });

  return { viewStory };
}
