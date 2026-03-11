import { useQuery } from "@tanstack/react-query";
import { getStories } from "../../services/apiStories";

export function useStories() {
  const {
    data: stories,
    isPending,
    error,
  } = useQuery({
    queryKey: ["stories"],
    queryFn: getStories,
  });

  return { stories, isPending, error };
}
