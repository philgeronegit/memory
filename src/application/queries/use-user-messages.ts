import MessagesService from "@/infrastructure/messages";
import { useQuery } from "@tanstack/react-query";

interface GetUserMessagesInput {
  userId?: number;
}

export function getQueryKey(userId?: number) {
  return ["messages", userId];
}

export function useUserMessages({ userId }: GetUserMessagesInput) {
  return useQuery({
    queryKey: getQueryKey(userId),
    queryFn: () => MessagesService.getUserMessages(userId)
  });
}
