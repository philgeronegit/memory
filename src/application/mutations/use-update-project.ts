import ProjectsService from "@/infrastructure/projects";
import { UpdateProjectInput } from "@/infrastructure/projects/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateProjectInput) =>
      ProjectsService.updateProject(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });
}
