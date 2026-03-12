import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStory as createStoryApi } from "../../services/apiStories";
import toast from "react-hot-toast";
import { useUser } from "../authentication/useUser";

export function useCreateStory() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { mutate: createStory, isPending } = useMutation({
    mutationFn: ({ imageUrl, caption }) =>
      createStoryApi({ imageUrl, caption }),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["stories"] });
      await queryClient.refetchQueries({ queryKey: ["stories", user.id] });
      toast.success("Story posted!");
    },
    onError: () => {
      toast.error("Couldn't post story");
    },
  });

  return { createStory, isPending };
}
