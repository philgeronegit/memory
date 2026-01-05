import commentsService from "@/infrastructure/comments";
import { UpdateNoteScoreInput } from "@/infrastructure/notes/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCommentScore() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateNoteScoreInput) =>
      commentsService.updateCommentScore(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    }
  });
}
