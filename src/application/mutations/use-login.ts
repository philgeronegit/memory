import UsersService from "@/infrastructure/users";
import { LoginInput } from "@/infrastructure/users/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: LoginInput) => UsersService.login(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    }
  });
}
