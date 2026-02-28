import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../../services/apiUsers";

export function useSearchUsers(query) {
  const { data: searchResults = [], isPending } = useQuery({
    queryKey: ["searchUsers", query],
    queryFn: () => searchUsers(query),
    enabled: !!query,
  });

  return { searchResults, isPending };
}
