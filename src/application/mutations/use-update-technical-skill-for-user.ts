import TechnicalSkillsService from "@/infrastructure/technical-skills";
import { UpdateTechnicalSkillForUserInput } from "@/infrastructure/technical-skills/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTechnicalSkillForUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateTechnicalSkillForUserInput) =>
      TechnicalSkillsService.updateTechnicalSkillForUser(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technical-skills"] });
    }
  });
}
