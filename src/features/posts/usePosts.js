import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/apiPosts";
import toast from "react-hot-toast";

export function usePosts() {
  const {
    data: posts,
    isPending,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    onError: () => {
      toast.error("could not reload posts");
    },
  });
  return { posts, isPending, error };
}
