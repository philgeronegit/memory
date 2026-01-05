import TasksService from "@/infrastructure/tasks";
import { BulkUpdateTaskOrderInput } from "@/infrastructure/tasks/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useBulkUpdateTaskOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: BulkUpdateTaskOrderInput) =>
      TasksService.bulkUpdateTaskOrder(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
}
