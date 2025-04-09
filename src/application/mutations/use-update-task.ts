import TasksService from "@/infrastructure/tasks";
import { UpdateTaskInput } from "@/infrastructure/tasks/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateTaskInput) => TasksService.updateTask(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
}
