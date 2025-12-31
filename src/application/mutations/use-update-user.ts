import UsersService from "@/infrastructure/users";
import { UpdateUserInput } from '@/infrastructure/users/interfaces';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateUserInput) => UsersService.updateUser(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });
}
