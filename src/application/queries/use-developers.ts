import DevelopersService from "@/infrastructure/developers";
import { useQuery } from "@tanstack/react-query";

export function getQueryKey() {
  return ["developers"];
}

export function useDevelopers() {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => DevelopersService.getDevelopers()
  });
}
