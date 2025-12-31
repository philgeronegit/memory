import TasksService from "@/infrastructure/tasks";
import { useQuery } from "@tanstack/react-query";

export function getQueryKey(userId?: number) {
  return ["tasks", userId];
}

export function useTasks() {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => TasksService.getTasks()
  });
}
