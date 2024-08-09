import {
	useMutation,
	type UseMutationResult,
	type UseMutationOptions,
} from "@tanstack/react-query";
import { api } from "../../../common/ky";

type RegisterInput = {
	email: string;
};

export const useRegister = (
	config?: Omit<UseMutationOptions<unknown, Error, RegisterInput>, "mutationFn">
): UseMutationResult<unknown, Error, RegisterInput> => {
	return useMutation({
		mutationFn: async (data: RegisterInput): Promise<unknown> => {
			const status = await api.post("auth/magic-link", { json: data }).json();
			return status;
		},
		...config,
	});
};
