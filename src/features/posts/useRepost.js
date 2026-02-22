import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import {
  isPostReposted,
  repostPost,
  undoRepost,
} from "../../services/apiReposts";

export function useRepost(postId) {
  const queryClient = useQueryClient();

  // Fetch real reposted postes from Supabase on mount
  const { data: isReposted = false } = useQuery({
    queryKey: ["reposted", postId],
    queryFn: () => isPostReposted(postId),
  });

  const { mutate: toggleRepost } = useMutation({
    mutationFn: () => (isReposted ? undoRepost(postId) : repostPost(postId)),

    onSuccess: () => {
      // update the reposts posts in  cache directly
      queryClient.setQueryData(["reposted", postId], !isReposted);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return { toggleRepost, isReposted };
}
