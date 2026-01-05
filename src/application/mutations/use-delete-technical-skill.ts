import TechnicalSkillsService from "@/infrastructure/technical-skills";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTechnicalSkill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => TechnicalSkillsService.deleteTechnicalSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technical-skills"] });
    }
  });
}
