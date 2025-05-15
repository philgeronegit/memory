import TechnicalSkillsService from "@/infrastructure/technical-skills";
import { useQuery } from "@tanstack/react-query";

interface GetUserTechnicalSkillsInput {
  userId?: number;
}

export function getQueryKey(userId?: number) {
  return ["technical-skills", userId];
}

export function useUserTechnicalSkills({
  userId
}: GetUserTechnicalSkillsInput) {
  return useQuery({
    queryKey: getQueryKey(userId),
    queryFn: () => TechnicalSkillsService.getUserTechnicalSkills(userId)
  });
}
