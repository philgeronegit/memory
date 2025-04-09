import TagService from "@/infrastructure/tags";
import { DeleteNoteTagInput } from "@/infrastructure/tags/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteNoteTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: DeleteNoteTagInput) => TagService.deleteNoteTag(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    }
  });
}
