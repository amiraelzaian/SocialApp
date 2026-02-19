import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/apiPosts";
import toast from "react-hot-toast";

export function usePosts() {
  const {
    data,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = null }) =>
      getPosts({ cursor: pageParam, limit: 20 }),

    getNextPageParam: (lastPage) => {
      if (!lastPage?.length) return undefined;

      const lastPost = lastPage[lastPage.length - 1];
      return lastPost.created_at;
    },

    onError: () => {
      toast.error("could not reload posts");
    },
  });

  return {
    posts: data?.pages.flat() ?? [],
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
