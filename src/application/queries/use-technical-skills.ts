import TechnicalSkillsService from "@/infrastructure/technical-skills";
import { useQuery } from "@tanstack/react-query";

export function getQueryKey() {
  return ["technical-skills"];
}

export function useTechnicalSkills() {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => TechnicalSkillsService.getTechnicalSkills()
  });
}
