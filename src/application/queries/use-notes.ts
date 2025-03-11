import NotesService from "@/infrastructure/notes";
import { useQuery } from "@tanstack/react-query";

export function getQueryKey() {
  return ["notes"];
}

export function useNotes() {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => NotesService.getNotes()
  });
}
