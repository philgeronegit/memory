import ProjectsService from "@/infrastructure/projects";
import { useQuery } from "@tanstack/react-query";

interface GetProjectsInput {
  userId?: number;
}

export function getQueryKey(userId?: number) {
  return userId ? ["projects", userId] : ["projects"];
}

export function useProjects({ userId }: GetProjectsInput = {}) {
  return useQuery({
    queryKey: getQueryKey(userId),
    queryFn: () =>
      userId
        ? ProjectsService.getUserProjects(userId)
        : ProjectsService.getProjects()
  });
}
