import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: (data) => signupApi(data),

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success("User is created successfully");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Could not create user, Invalid operation");
    },
  });

  return { signup, isPending };
}
