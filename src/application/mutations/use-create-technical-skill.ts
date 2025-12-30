import TechnicalSkillsService from "@/infrastructure/technical-skills";
import { CreateTechnicalSkillInput } from "@/infrastructure/technical-skills/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTechnicalSkill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTechnicalSkillInput) =>
      TechnicalSkillsService.createTechnicalSkill(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technical-skills"] });
    }
  });
}
