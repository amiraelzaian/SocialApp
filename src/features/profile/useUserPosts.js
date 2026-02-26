import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostsByUser } from "../../services/apiPosts";

export function useUserPosts(userId) {
  const {
    data,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["userPosts", userId],
    queryFn: ({ pageParam = null }) => getPostsByUser(userId, pageParam),
    getNextPageParam: (lastPage) => {
      if (!lastPage?.length || lastPage.length < 10) return undefined;
      return lastPage.at(-1).created_at; // cursor = last post's created_at
    },
    enabled: !!userId,
  });

  const userPosts = data?.pages.flatMap((page) => page) ?? [];

  return {
    userPosts,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
