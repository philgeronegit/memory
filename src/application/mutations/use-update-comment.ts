import CommentService from "@/infrastructure/comments";
import { UpdateCommentInput } from "@/infrastructure/comments/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateCommentInput) =>
      CommentService.updateComment(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    }
  });
}
