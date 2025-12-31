import ProjectsService from "@/infrastructure/projects";
import { useQuery } from "@tanstack/react-query";

interface GetUserProjectsInput {
  userId?: number;
}

export function getQueryKey(userId?: number) {
  return ["projects", userId];
}

export function useProjects() {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => ProjectsService.getProjects()
  });
}

export function useUserProjects({ userId }: GetUserProjectsInput = {}) {
  return useQuery({
    queryKey: getQueryKey(userId),
    queryFn: () => ProjectsService.getUserProjects(userId),
    enabled: !!userId
  });
}
