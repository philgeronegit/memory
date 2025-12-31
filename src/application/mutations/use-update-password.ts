import UsersService from "@/infrastructure/users";
import { UpdatePasswordInput } from "@/infrastructure/users/interfaces";
import { useMutation } from "@tanstack/react-query";

export function useUpdatePassword() {
	return useMutation({
		mutationFn: (input: UpdatePasswordInput) => UsersService.updatePassword(input)
	});
}
