import { useQuery } from "@tanstack/react-query";
import { getUnviewedStoriesCount } from "../../services/apiStories";

export function useUnviewedStoriesCount() {
  const { data: unviewedCount, isPending } = useQuery({
    queryKey: ["unviewedStoriesCount"],
    queryFn: getUnviewedStoriesCount,
  });

  return { unviewedCount, isPending };
}
