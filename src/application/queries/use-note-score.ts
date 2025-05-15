import NotesService from "@/infrastructure/notes";
import { useQuery } from "@tanstack/react-query";

interface GetNoteScoreInput {
  noteId?: number;
  userId?: number;
}

export function getQueryKey(noteId?: number, userId?: number) {
  return ["note-score", noteId, userId];
}

export function useNoteScore({ noteId, userId }: GetNoteScoreInput) {
  return useQuery({
    queryKey: getQueryKey(noteId, userId),
    queryFn: () => NotesService.getNoteScore(noteId, userId),
    enabled: !!noteId && !!userId
  });
}
