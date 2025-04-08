import DeveloperService from "@/infrastructure/developers";
import { UpdateDeveloperInput } from "@/infrastructure/developers/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateDeveloper() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateDeveloperInput) =>
      DeveloperService.updateDeveloper(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  });
}
