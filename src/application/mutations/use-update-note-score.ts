import NotesService from "@/infrastructure/notes";
import { UpdateNoteScoreInput } from "@/infrastructure/notes/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateNoteScore() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateNoteScoreInput) =>
      NotesService.updateNoteScore(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
    }
  });
}
