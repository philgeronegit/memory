import NotesService from "@/infrastructure/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => NotesService.deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  });
}
