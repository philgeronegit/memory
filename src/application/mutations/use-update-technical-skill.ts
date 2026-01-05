import TechnicalSkillsService from "@/infrastructure/technical-skills";
import { UpdateTechnicalSkillInput } from "@/infrastructure/technical-skills/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTechnicalSkill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateTechnicalSkillInput) =>
      TechnicalSkillsService.updateTechnicalSkill(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technical-skills"] });
    }
  });
}
