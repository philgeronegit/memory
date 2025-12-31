import MessageService from "@/infrastructure/messages";
import { CreateMessageInput } from '@/infrastructure/messages/interfaces';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateMessageInput) => MessageService.createMessage(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    }
  });
}
