import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStory as createStoryApi } from "../../services/apiStories";
import toast from "react-hot-toast";

export function useCreateStory() {
  const queryClient = useQueryClient();

  const { mutate: createStory, isPending } = useMutation({
    mutationFn: ({ imageUrl, caption }) =>
      createStoryApi({ imageUrl, caption }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      toast.success("Story posted!");
    },
    onError: () => {
      toast.error("Couldn't post story");
    },
  });

  return { createStory, isPending };
}
