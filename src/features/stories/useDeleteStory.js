import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStory as deleteStoryApi } from "../../services/apiStories";
import { deleteImage } from "../../services/apiStorage";
import toast from "react-hot-toast";

export function useDeleteStory() {
  const queryClient = useQueryClient();

  const { mutate: deleteStory, isPending } = useMutation({
    mutationFn: async ({ storyId, imageUrl }) => {
      // 1. extract path from imageUrl
      const path = imageUrl.split("/stories/")[1]; // ← get path after bucket name

      // 2. delete image from storage
      await deleteImage("stories", path);

      // 3. delete story from DB
      return deleteStoryApi(storyId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      toast.success("Story deleted");
    },
    onError: () => {
      toast.error("Couldn't delete story");
    },
  });

  return { deleteStory, isPending };
}
