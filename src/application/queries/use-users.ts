import UsersService from "@/infrastructure/users";
import { useQuery } from "@tanstack/react-query";

export function getQueryKey() {
  return ["users"];
}

export function useUsers() {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => UsersService.getUsers()
  });
}
