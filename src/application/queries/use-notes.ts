import NotesService from "@/infrastructure/notes";
import { useQuery } from "@tanstack/react-query";

interface GetNotesInput {
  userId?: number;
}

export function getQueryKey(userId?: number) {
  return ["notes", userId];
}

export function useNotes({ userId }: GetNotesInput = {}) {
  return useQuery({
    queryKey: getQueryKey(userId),
    queryFn: () => NotesService.getUserNotes(userId),
    enabled: !!userId
  });
}
