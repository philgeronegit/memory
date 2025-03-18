import TasksService from "@/infrastructure/tasks";
import { useQuery } from "@tanstack/react-query";

export function getQueryKey() {
  return ["tasks"];
}

export function useTasks() {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => TasksService.getTasks()
  });
}
