import NotesService from "@/infrastructure/notes";
import { ShareNoteInput } from '@/infrastructure/notes/dto';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useShareNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ShareNoteInput) =>
      NotesService.shareNote(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  });
}
