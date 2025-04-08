import TagService from "@/infrastructure/tags";
import { CreateNoteTagInput } from "@/infrastructure/tags/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateNoteTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateNoteTagInput) => TagService.createNoteTag(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    }
  });
}
