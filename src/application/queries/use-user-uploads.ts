import MessagesService from "@/infrastructure/uploads";
import { useQuery } from "@tanstack/react-query";

interface GetUserUploadsInput {
  userId?: number;
}

export function getQueryKey(userId?: number) {
  return ["uploads", userId];
}

export function useUserUploads({ userId }: GetUserUploadsInput) {
  return useQuery({
    queryKey: getQueryKey(userId),
    queryFn: () => MessagesService.getUserUploads(userId)
  });
}
