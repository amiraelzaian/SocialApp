import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../services/apiComments";
import toast from "react-hot-toast";

export function useComments(postId) {
  const { data: comments = [], isPending } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
    onError: () => {
      toast.error("Couldn't fetch comments");
    },
  });
  return { comments, isPending };
}
