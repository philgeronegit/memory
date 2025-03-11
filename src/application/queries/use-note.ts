import NotesService from "@/infrastructure/notes";
import { useQuery } from "@tanstack/react-query";

interface GetNoteInput {
  noteId?: number;
}

export function getQueryKey(noteId?: number) {
  return ["note", noteId];
}

export function useNote({ noteId }: GetNoteInput) {
  return useQuery({
    queryKey: getQueryKey(noteId),
    queryFn: () => NotesService.getNote(noteId),
    enabled: !!noteId
  });
}
