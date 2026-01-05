import TasksService from "@/infrastructure/tasks";
import { useQuery } from "@tanstack/react-query";

interface GetTasksInput {
  userId?: number;
}

export function getQueryKey(userId?: number) {
  return ["tasks", userId];
}

export function useUserTasks({ userId }: GetTasksInput = {}) {
  return useQuery({
    queryKey: getQueryKey(userId),
    queryFn: () => TasksService.getUserTasks(userId),
    enabled: !!userId
  });
}
