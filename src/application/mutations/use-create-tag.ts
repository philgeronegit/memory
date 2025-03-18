import TagService from "@/infrastructure/tags";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateTagInput {
  name: string;
}

export function useCreateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTagInput) => TagService.createTag(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  });
}
