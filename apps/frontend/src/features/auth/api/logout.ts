import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { api } from "../../../common/ky";
import { queryClient } from "../../../common/react-query";
import { useUser } from "./get-user";
import { Router, useNavigate } from "@tanstack/react-router";
import { router } from "../../../common/router";
import { useAuthStore } from "../../../store/auth-store";

export const useLogout = (
    config?: Omit<UseMutationOptions<unknown, Error, void>, "mutationFn">
): UseMutationResult<unknown, Error, void> => {
    return useMutation({
		mutationFn: async (): Promise<unknown> => {
			const status = await api.post("auth/signout", { credentials: "include" }).json();
			useAuthStore.setState({ isLoggedIn: false })
			queryClient.removeQueries({queryKey: ["auth/me"]});
			return status;
		},
		...config,
	});
}