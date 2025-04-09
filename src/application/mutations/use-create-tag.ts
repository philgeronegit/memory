import TagService from "@/infrastructure/tags";
import { CreateTagInput } from "@/infrastructure/tags/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTagInput) => TagService.createTag(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    }
  });
}
