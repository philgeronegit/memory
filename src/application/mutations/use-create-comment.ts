import CommentService from "@/infrastructure/comments";
import { CreateCommentInput } from "@/infrastructure/comments/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateCommentInput) =>
      CommentService.createComment(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    }
  });
}
