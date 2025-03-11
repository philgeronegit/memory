import ProjectsService from "@/infrastructure/projects";
import { useQuery } from "@tanstack/react-query";

export function getQueryKey() {
  return ["projects"];
}

export function useProjects() {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => ProjectsService.getProjects()
  });
}
