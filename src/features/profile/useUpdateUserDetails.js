import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile as updateProfileApi } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useUpdateUserDetails(onClose) {
  const queryClient = useQueryClient();
  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: (
      { fullName, bio, location, website }, // ✅ was queryFn
    ) => updateProfileApi({ fullName, bio, location, website }),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast.error("Could not update profile");
    },
    onSettled: () => {
      onClose();
    },
  });

  return { updateProfile, isUpdating };
}
