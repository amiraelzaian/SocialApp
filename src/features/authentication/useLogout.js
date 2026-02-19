//
import toast from "react-hot-toast";
import { logout as logoutApi } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      queryClient.removeQueries(["user"]);
      toast.success("Successfully logged out");
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Could not log out");
    },
  });

  return { logout, isPending };
}
