import ProjectsService from "@/infrastructure/projects";
import { DeleteUserFromProjectInput } from "@/infrastructure/projects/user-project-dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRemoveUserFromProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: DeleteUserFromProjectInput) =>
      ProjectsService.deleteUserFromProject(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });
}
