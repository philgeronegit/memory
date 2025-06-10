import ProjectsService from "@/infrastructure/projects";
import { CreateProjectInput } from "@/infrastructure/projects/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateProjectInput) =>
      ProjectsService.createProject(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });
}
