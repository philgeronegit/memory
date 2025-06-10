import ProjectsService from "@/infrastructure/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: number) => ProjectsService.deleteProject(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });
}
