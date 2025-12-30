import TechnicalSkillsService from "@/infrastructure/technical-skills";
import { DeleteTechnicalSkillFromUserInput } from '@/infrastructure/technical-skills/dto';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTechnicalSkillFromUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: DeleteTechnicalSkillFromUserInput) => TechnicalSkillsService.deleteTechnicalSkillFromUser(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technical-skills"] });
    }
  });
}
