import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadCover as uploadCoverApi } from "../../services/apiStorage";
import toast from "react-hot-toast";

export function useUploadCover() {
  const queryClient = useQueryClient();
  const { mutate: uploadCover, isPending } = useMutation({
    mutationFn: ({ userId, file }) => uploadCoverApi(userId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Cover is updated succefully");
    },
    onError: () => {
      toast.error("Could not update Cover");
    },
  });

  return { uploadCover, isPending };
}
