import CommentService from "@/infrastructure/comments";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => CommentService.deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    }
  });
}
