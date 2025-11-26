import TasksService from "@/infrastructure/tasks";
import { CreateTaskInput } from "@/infrastructure/tasks/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTaskInput) => TasksService.createTask(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["user-tasks"] });
    }
  });
}
