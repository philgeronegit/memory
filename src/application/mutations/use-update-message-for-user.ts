import MessagesService from "@/infrastructure/messages";
import { UpdateMessageForUserInput } from '@/infrastructure/messages/interfaces';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateMessageForUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateMessageForUserInput) =>
      MessagesService.updateMessageForUser(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    }
  });
}