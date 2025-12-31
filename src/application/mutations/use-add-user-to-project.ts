import ProjectsService from "@/infrastructure/projects";
import { AddUserToProjectInput } from "@/infrastructure/projects/user-project-dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddUserToProject() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (input: AddUserToProjectInput) =>
			ProjectsService.addUserToProject(input),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		}
	});
}
