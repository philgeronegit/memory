import ProjectsService from "@/infrastructure/projects";
import { useQuery } from "@tanstack/react-query";

interface GetUserProjectsInput {
  userId?: number;
}

interface GetProjectInput {
  projectId?: number;
}

export function getQueryKey(userId?: number) {
  return ["projects", userId];
}

export function getProjectQueryKey(projectId?: number) {
  return ["project", projectId];
}

export function useProjects() {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => ProjectsService.getProjects()
  });
}

export function useProject({ projectId }: GetProjectInput) {
  return useQuery({
    queryKey: getProjectQueryKey(projectId),
    queryFn: () => ProjectsService.getProject(projectId),
    enabled: !!projectId
  });
}

export function useUserProjects({ userId }: GetUserProjectsInput = {}) {
  return useQuery({
    queryKey: getQueryKey(userId),
    queryFn: () => ProjectsService.getUserProjects(userId),
    enabled: !!userId
  });
}
