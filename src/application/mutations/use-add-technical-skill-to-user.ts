import TechnicalSkillsService from "@/infrastructure/technical-skills";
import { AddTechnicalSkillToUserInput } from "@/infrastructure/technical-skills/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddTechnicalSkillToUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: AddTechnicalSkillToUserInput) =>
      TechnicalSkillsService.addTechnicalSkillToUser(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technical-skills"] });
    }
  });
}
