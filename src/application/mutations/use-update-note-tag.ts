import TagService from "@/infrastructure/tags";
import { UpdateNoteTagInput } from "@/infrastructure/tags/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateNoteTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateNoteTagInput) => TagService.updateNoteTag(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    }
  });
}
