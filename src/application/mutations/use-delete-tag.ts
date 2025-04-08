import TagService from "@/infrastructure/tags";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => TagService.deleteTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    }
  });
}
