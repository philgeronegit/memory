import NotesService from "@/infrastructure/notes";
import { CreateNoteInput } from "@/infrastructure/notes/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateNoteInput) => NotesService.createNote(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  });
}
