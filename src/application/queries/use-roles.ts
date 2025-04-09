import RolesService from "@/infrastructure/roles";
import { useQuery } from "@tanstack/react-query";

export function getQueryKey() {
  return ["roles"];
}

export function useRoles() {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => RolesService.getRoles()
  });
}
