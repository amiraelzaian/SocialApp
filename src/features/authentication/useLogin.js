import toast from "react-hot-toast";
import { login as loginApi } from "../../services/apiAuth";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success("Logged in successfully");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log("Error", err.message);
      toast.error("Provided email or password are invalid");
    },
  });

  return { login, isLoading };
}
