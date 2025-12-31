import StatusService from '@/infrastructure/status';
import { useQuery } from "@tanstack/react-query";

export function getQueryKey() {
  return ["statuses"];
}

export function useStatuses() {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => StatusService.getStatuses()
  });
}
