import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../../services/apiPosts";

export function usePostById(postId) {
  const {
    data: post,
    isPending,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });

  return { post, isPending, error };
}
