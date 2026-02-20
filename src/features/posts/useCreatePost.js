import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/apiPosts";
import toast from "react-hot-toast";

export function useCreatePost() {
  const queryClient = useQueryClient();

  const { mutate: createNewPost, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Post created successfully! 🎉");
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createNewPost, isPending };
}
