import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage as sendMessageApi } from "../../services/apiMessages";
import toast from "react-hot-toast";

export function useSendMessage() {
  const queryClient = useQueryClient();
  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: ({ receiverId, content }) =>
      sendMessageApi(receiverId, content),
    onSuccess: (_, { receiverId }) => {
      queryClient.invalidateQueries({ queryKey: ["messages", receiverId] });
    },
    onError: () => {
      toast.error("couldn't send this message");
    },
  });

  return { sendMessage, isSending };
}
