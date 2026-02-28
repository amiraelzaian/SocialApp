import { useQuery } from "@tanstack/react-query";
import { getSuggestedUsers } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useSuggestedUsers() {
  const { data: suggestedUsers, isPending } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: getSuggestedUsers,
    onError: () => {
      toast.error("could not reload suggestions");
    },
  });
  return { suggestedUsers, isPending };
}
