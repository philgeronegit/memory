import NotesService from "@/infrastructure/notes";
import { useQuery } from "@tanstack/react-query";

interface GetNotesInput {
  userId?: number;
}

export function getQueryKey(userId?: number) {
  return ["notes-count", userId];
}

export function useNotesCount({ userId }: GetNotesInput = {}) {
  return useQuery({
    queryKey: getQueryKey(userId),
    queryFn: () => NotesService.getUserNotesCount(userId),
    enabled: !!userId
  });
}
