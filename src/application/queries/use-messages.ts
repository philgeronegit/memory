import MessagesService from "@/infrastructure/messages";
import { useQuery } from "@tanstack/react-query";

export function getQueryKey() {
  return ["messages"];
}

export function useMessages() {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => MessagesService.getMessages()
  });
}
