import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadAvatar as uploadAvatarApi } from "../../services/apiStorage";
import toast from "react-hot-toast";

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  const { mutate: uploadAvatar, isPending } = useMutation({
    mutationFn: ({ userId, file }) => uploadAvatarApi(userId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Avatar updated successfully");
    },
    onError: () => {
      toast.error("Could not update avatar");
    },
  });

  return { uploadAvatar, isPending };
}
