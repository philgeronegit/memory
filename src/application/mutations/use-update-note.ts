import NotesService from "@/infrastructure/notes";
import { UpdateNoteInput } from "@/infrastructure/notes/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateNoteInput) => NotesService.updateNote(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  });
}
