import NotesService from "@/infrastructure/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

interface CreateNoteInput {
  title: string;
  content: string;
  type: string;
  is_public: boolean;
  id_programming_language: number;
  id_project?: number;
  id_developer: number;
}

export function useCreateNote() {
  return useMutation({
    mutationFn: (input: CreateNoteInput) => NotesService.createNote(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  });
}
